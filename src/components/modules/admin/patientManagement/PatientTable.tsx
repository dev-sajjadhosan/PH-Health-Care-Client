"use client";

import { useServerManagedDataTableFilters } from "@/hooks/useServerManagedDataTableFilters";
import { getPatients } from "@/services/patient.services";
import { PaginationMeta } from "@/types/api.types";
import { IPatient } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import CreatePatientFormModal from "./CreatePatientFormModal";
import DeletePatientConfirmationDialog from "./DeletePatientConfirmationDialog";
import EditPatientFormModal from "./EditPatientFormModal";
import ViewPatientProfileDialog from "./ViewPatientProfileDialog";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { patientColumns } from "./patientColumns";
import TanTable from "@/components/shared/table/tanTable";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const PatientTable = ({ initialQueryString }: { initialQueryString: string }) => {
    const searchParams = useSearchParams();
    const {
      viewingItem,
      editingItem,
      deletingItem,
      isViewDialogOpen,
      isEditModalOpen,
      isDeleteDialogOpen,
      onViewOpenChange,
      onEditOpenChange,
      onDeleteOpenChange,
      tableActions,
    } = useRowActionModalState<IPatient>();

    const {
      queryStringFromUrl,
      optimisticSortingState,
      optimisticPaginationState,
      isRouteRefreshPending,
      updateParams,
      handleSortingChange,
      handlePaginationChange,
    } = useServerManagedDataTable({
      searchParams,
      defaultPage: DEFAULT_PAGE,
      defaultLimit: DEFAULT_LIMIT,
    });

    const queryString = queryStringFromUrl || initialQueryString;

    const {
      searchTermFromUrl,
      handleDebouncedSearchChange,
    } = useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

    // We can add filters here similarly to DoctorTable if needed. 
    // For now we pass empty definitions to match the hook signature.
    const {
      filterValues,
      handleFilterChange,
      clearAllFilters,
    } = useServerManagedDataTableFilters({
      searchParams,
      definitions: [], 
      updateParams,
    });

    const { data : patientDataResponse, isLoading, isFetching } = useQuery({
      queryKey: ["patients", queryString],
      queryFn: () => getPatients(queryString)
    });

    const patients = patientDataResponse?.data ?? [];
    const meta: PaginationMeta | undefined = patientDataResponse?.meta;

    return (
      <>
        <TanTable
          data={patients}
          columns={patientColumns}
          isLoading={isLoading || isFetching || isRouteRefreshPending}
          emptyMessage="No patients found."
          sorting={{
            state: optimisticSortingState,
            onSortingChange: handleSortingChange,
          }}
          pagination={{
            state: optimisticPaginationState,
            onPaginationChange: handlePaginationChange,
          }}
          search={{
            initialValue: searchTermFromUrl,
            placeholder: "Search patient by name, email...",
            debounceMs: 700,
            onDebouncedChange: handleDebouncedSearchChange,
          }}
          filters={{
            configs: [],
            values: {},
            onFilterChange: handleFilterChange,
            onClearAll: clearAllFilters,
          }}
          toolbarAction={
            <CreatePatientFormModal />
          }
          meta={meta}
          actions={tableActions}
        />

        <EditPatientFormModal
          open={isEditModalOpen}
          onOpenChange={onEditOpenChange}
          patient={editingItem}
        />

        <DeletePatientConfirmationDialog
          open={isDeleteDialogOpen}
          onOpenChange={onDeleteOpenChange}
          patient={deletingItem}
        />

        <ViewPatientProfileDialog
          open={isViewDialogOpen}
          onOpenChange={onViewOpenChange}
          patient={viewingItem}
        />
      </>
    )

}
export default PatientTable;

"use client"


import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import {
    serverManagedFilter,
    useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { getMyDoctorSchedules } from "@/services/doctorSchedule.services"
import { PaginationMeta } from "@/types/api.types"
import { type IDoctorSchedule } from "@/types/doctorSchedule.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import BookScheduleModal from "./BookScheduleModal"
import DeleteMyScheduleConfirmationDialog from "./DeleteMyScheduleConfirmationDialog"
import { doctorSchedulesColumns } from "./doctorSchedulesColumns"
import ViewMyScheduleDialog from "./ViewMyScheduleDialog"
import { TanTableFilterConfig, TanTableFilterValues } from "@/components/shared/table/TanTableFilters"
import TanTable from "@/components/shared/table/tanTable"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const DOCTOR_SCHEDULE_FILTER_DEFINITIONS = [
	serverManagedFilter.single("isBooked"),
]

const DoctorSchedulesTable = ({ initialQueryString }: { initialQueryString: string }) => {
	const searchParams = useSearchParams()
	const {
		viewingItem,
		deletingItem,
		isViewDialogOpen,
		isDeleteDialogOpen,
		onViewOpenChange,
		onDeleteOpenChange,
		tableActions,
	} = useRowActionModalState<IDoctorSchedule>({ enableEdit: false })

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
	})

	const queryString = queryStringFromUrl || initialQueryString

	const {
		searchTermFromUrl,
		handleDebouncedSearchChange,
	} = useServerManagedDataTableSearch({
		searchParams,
		updateParams,
	})

	const {
		filterValues,
		handleFilterChange,
		clearAllFilters,
	} = useServerManagedDataTableFilters({
		searchParams,
		definitions: DOCTOR_SCHEDULE_FILTER_DEFINITIONS,
		updateParams,
	})

	const { data: doctorSchedulesResponse, isLoading, isFetching } = useQuery({
		queryKey: ["my-doctor-schedules", queryString],
		queryFn: () => getMyDoctorSchedules(queryString),
	})

	const doctorSchedules = doctorSchedulesResponse?.data ?? []
	const meta: PaginationMeta | undefined = doctorSchedulesResponse?.meta

	const filterConfigs = useMemo<TanTableFilterConfig[]>(() => {
		return [
			{
				id: "isBooked",
				label: "Status",
				type: "single-select",
				options: [
					{ label: "Booked", value: "true" },
					{ label: "Available", value: "false" },
				],
			},
		]
	}, [])

	const filterValuesForTable = useMemo<TanTableFilterValues>(() => {
		return {
			isBooked: filterValues.isBooked,
		}
	}, [filterValues])

	return (
		<>
			<TanTable
				data={doctorSchedules}
				columns={doctorSchedulesColumns}
				isLoading={isLoading || isFetching || isRouteRefreshPending}
				emptyMessage="No schedules assigned yet."
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
					placeholder: "Search by doctor id, schedule id...",
					debounceMs: 700,
					onDebouncedChange: handleDebouncedSearchChange,
				}}
				filters={{
					configs: filterConfigs,
					values: filterValuesForTable,
					onFilterChange: handleFilterChange,
					onClearAll: clearAllFilters,
				}}
				toolbarAction={<BookScheduleModal />}
				meta={meta}
				actions={tableActions}
			/>

			<DeleteMyScheduleConfirmationDialog
				open={isDeleteDialogOpen}
				onOpenChange={onDeleteOpenChange}
				doctorSchedule={deletingItem}
			/>

			<ViewMyScheduleDialog
				open={isViewDialogOpen}
				onOpenChange={onViewOpenChange}
				doctorSchedule={viewingItem}
			/>
		</>
	)
}

export default DoctorSchedulesTable
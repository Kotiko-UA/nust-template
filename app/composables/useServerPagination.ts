import { ref, computed } from 'vue'

export function useServerPagination(itemsPerPage: number = 5) {
  const currentPage = ref(1)
  const totalItems = ref(0)
  const totalPages = ref(1)

  const setMeta = (meta: { page: number; perPage: number; total: number; totalPages: number }) => {
    currentPage.value = meta.page
    totalItems.value = meta.total
    totalPages.value = meta.totalPages
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const resetPagination = () => {
    currentPage.value = 1
  }

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  return {
    currentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    setMeta,
    nextPage,
    prevPage,
    goToPage,
    resetPagination,
    hasNextPage,
    hasPrevPage
  }
}

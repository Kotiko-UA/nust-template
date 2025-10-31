export function useModal(id = 'default') {
  const key = `modal_state_${id}`
  const isOpen = useState<boolean>(key, () => false)

  function open() {
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }
  function toggle() {
    isOpen.value = !isOpen.value
  }

  return {
    id,
    isOpen,
    open,
    close,
    toggle,
  }
}

<template>
  <Teleport to="body" v-if="mounted">
    <Transition name="modal-fade">
      <div
        v-show="localOpen"
        class="nuxt-modal__backdrop"
        @mousedown.self="onBackdropDown"
        @click.self="onBackdropClick"
        aria-hidden="false"
      >
        <div
          class="nuxt-modal__dialog"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
          ref="dialog"
          tabindex="-1"
          @keydown.esc.prevent="close"
        >
          <div class="nuxt-modal__close-slot">
            <button
              class="w-6 h-6 border-none flex items-center justify-center bg-transparent"
              @click="close"
            >
              <component :is="CloseMenuIcon" class="w-full h-full" />
            </button>
          </div>
          <div class="nuxt-modal__content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import CloseMenuIcon from '@/assets/images/icons/icon-close.svg'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  ariaLabelledby: { type: String, default: '' },
  ariaDescribedby: { type: String, default: '' },
  closeOnBackdrop: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const localOpen = ref(props.modelValue)
const dialog = ref<HTMLElement | null>(null)
const previouslyFocused = ref<HTMLElement | null>(null)
const mounted = ref(false)
let backdropMouseDownTarget: EventTarget | null = null

onMounted(() => {
  mounted.value = true
})

watch(
  () => props.modelValue,
  v => {
    localOpen.value = v
  }
)

watch(localOpen, async open => {
  if (open) {
    previouslyFocused.value = document.activeElement as HTMLElement | null
    await nextTick()
    dialog.value?.focus()
    emit('open')
    addNoScroll()
  } else {
    removeNoScroll()
    emit('close')
    previouslyFocused.value?.focus?.()
  }
  emit('update:modelValue', open)
})

function addNoScroll() {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}
function removeNoScroll() {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

function close() {
  localOpen.value = false
}

function onBackdropDown(e: MouseEvent) {
  backdropMouseDownTarget = e.target
}

function onBackdropClick(e: MouseEvent) {
  if (!props.closeOnBackdrop) return
  if (backdropMouseDownTarget === e.target) close()
  backdropMouseDownTarget = null
}

onBeforeUnmount(removeNoScroll)

defineExpose({ close })
</script>

<style scoped>
.nuxt-modal__backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  padding: 1rem;
}

.nuxt-modal__dialog {
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.35);
  position: relative;
  outline: none; /* we manage focus style as needed */
  padding: 40px;
}

.nuxt-modal__close-slot {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.nuxt-modal__content {
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 180ms cubic-bezier(0.2, 0.9, 0.2, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.995);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>

import { ref } from "vue";

// which component to rended
const content = ref(null);
// state of the modal
const isActive = ref(false);

export function modalState() {
  return {
    content,
    isActive,
    show: () => (isActive.value = true),
    hide: () => (isActive.value = false),
  };
}

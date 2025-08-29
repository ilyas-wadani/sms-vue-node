import { defineStore } from 'pinia'
export const useUi = defineStore('ui', {
  state: () => ({ sidebarOpen: false }),
  actions: {
    toggle() { this.sidebarOpen = !this.sidebarOpen },
    open()   { this.sidebarOpen = true },
    close()  { this.sidebarOpen = false },
  },
})

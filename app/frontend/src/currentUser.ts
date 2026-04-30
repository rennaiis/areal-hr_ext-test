import { ref } from 'vue'
import type { User } from './interfaces'
export const currentUser = ref<User | null>(null)
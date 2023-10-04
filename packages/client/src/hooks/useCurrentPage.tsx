import { useAtom } from 'jotai'
import { activePage_atom } from '../atoms'

export default function useCurrentPage() {
  return useAtom(activePage_atom)
}

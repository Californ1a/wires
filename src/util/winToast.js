import { useToast } from 'vue-toastification';
import useStore from '@/store';
import WinToast from '@/components/WinToast.vue';
import { isDev } from '@/util/env';

const toast = useToast();

export default function winToast() {
  const store = useStore();
  setTimeout(() => {
    if (isDev) {
      // eslint-disable-next-line no-alert
      alert('You win!');
      store.seedTestBoard();
      return;
    }
    toast.update('win-toast', {
      content: {
        component: WinToast,
      },
      options: {
        id: 'win-toast',
        type: 'success',
        timeout: false,
        closeButton: false,
        draggable: false,
        onClose: () => store.seedTestBoard(),
      },
    }, true);
  });
}

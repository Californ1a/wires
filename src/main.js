import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import App from './App.vue';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

const toastOptions = {
  position: 'top-center',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__fade',
  toastClassName: 'toast',
};

app.use(createPinia());

app.use(Toast, toastOptions);

app.mount('#app');

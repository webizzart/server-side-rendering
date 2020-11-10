import './index.pcss';
import  App from './pages/home';
import { defineComponent } from './utilis/utilis';
if (PRODUCTION) {
  require('offline-plugin/runtime').install();
}
//pages
[
  {Selector:`my-app`,Component:App}
]
.forEach((c=>defineComponent(c)));

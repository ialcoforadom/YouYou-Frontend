import { boot } from 'quasar/wrappers';
import { Money3Directive } from 'v-money3';
import { Money3Component } from 'v-money3';
export default boot(({ app }) => {
  app.directive('money3', Money3Directive);
  app.component('money3', Money3Component);
});

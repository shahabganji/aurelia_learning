import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
          './elements/loading-indicator'
       ,  './value-converters/name-format'
       ,  './elements/tab-panel-pills.html'
       ,  './elements/validation-summary.html'
       
       ]);
}
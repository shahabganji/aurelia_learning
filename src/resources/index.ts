import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
          './elements/loading-indicator'
       ,  './elements/star-rate/star-rate'
       ,  './value-converters/name-format'
       ,  './elements/tab-panel-pills.html'
       
       ]);
}
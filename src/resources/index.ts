import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(['./elements/loading-indicator' , './elements/tab-panel-pills.html']);
}
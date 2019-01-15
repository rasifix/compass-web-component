import Vue from 'vue';

import wrap from '@vue/web-component-wrapper';
import Compass from './components/Compass';

const CustomElement = wrap(Vue, Compass);

window.customElements.define('compass-view', CustomElement);
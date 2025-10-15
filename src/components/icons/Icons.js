import { defineComponent, h } from 'vue'

export const CheckmarkIcon = defineComponent({
  name: 'CheckmarkIcon',
  props: {
    class: String
  },
  render() {
    return h('svg', {
      class: this.class,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('path', { d: 'M9 12l2 2 4-4' })
    ])
  }
})

export const BoltIcon = defineComponent({
  name: 'BoltIcon',
  props: {
    class: String
  },
  render() {
    return h('svg', {
      class: this.class,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ])
  }
})

export const CubeIcon = defineComponent({
  name: 'CubeIcon',
  props: {
    class: String
  },
  render() {
    return h('svg', {
      class: this.class,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '3', y: '11', width: '4', height: '4' }),
      h('rect', { x: '8', y: '11', width: '4', height: '4' }),
      h('rect', { x: '13', y: '11', width: '4', height: '4' }),
      h('rect', { x: '8', y: '6', width: '4', height: '4' })
    ])
  }
})

export const ChartIcon = defineComponent({
  name: 'ChartIcon',
  props: {
    class: String
  },
  render() {
    return h('svg', {
      class: this.class,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }),
      h('path', { d: 'M4 12h3l2 3 3-6 2 3h6' })
    ])
  }
})

export const SettingsIcon = defineComponent({
  name: 'SettingsIcon',
  props: {
    class: String
  },
  render() {
    return h('svg', {
      class: this.class,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '3' }),
      h('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15a1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 3.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 3.6c.22 0 .43-.04.63-.1H9a2 2 0 1 1 4 0h.09c.2.06.41.1.63.1a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c0 .22.04.43.1.63V9a2 2 0 1 1 0 4h-.09c-.2.06-.41.1-.61.1z' })
    ])
  }
})

export const WorkflowIcon = defineComponent({
  name: 'WorkflowIcon',
  props: {
    class: String
  },
  render() {
    return h('svg', {
      class: this.class,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '6', cy: '6', r: '3' }),
      h('circle', { cx: '18', cy: '6', r: '3' }),
      h('circle', { cx: '6', cy: '18', r: '3' }),
      h('path', { d: 'M9 6h6M6 9v6m12-9v12M9 18h6' })
    ])
  }
})
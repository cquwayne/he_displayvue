import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Structure from '../components/structure/Structure'
import Node from '../components/structure/Node'
import Point from '../components/structure/Point'
import Pipe from '../components/structure/Pipe'
import Hyperlink from '../components/structure/Hyperlink'
import Normalize from '../components/normalize/Normalize'
import Metadata from '../components/normalize/Metadata'
import Rule from '../components/normalize/Rule'
import Chain from '../components/normalize/Chain'
import Attribute from '../components/normalize/Attribute'
import AttrRef from '../components/normalize/AttrRef'
import InfoRef from '../components/normalize/InfoRef'
import Information from '../components/normalize/Information'
import Integration from '../components/integration/Integration'
import Process from '../components/integration/Process'
import Diagram from '../components/integration/Diagram'
import Bind from '../components/integration/Bind'
import Realtime from '../components/integration/Realtime'
import Influx from '../components/integration/Influx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/structure/',
      name: 'Structure',
      component: Structure,
      children: [
        {
          path: 'node',
          name: 'Node',
          component: Node
        },
        {
          path: 'point',
          name: 'Point',
          component: Point
        },
        {
          path: 'pipe',
          name: 'Pipe',
          component: Pipe
        },
        {
          path: 'hyperlink',
          name: 'Hyperlink',
          component: Hyperlink
        }
      ]
    },
    {
      path: '/normalize/',
      name: 'Normalize',
      component: Normalize,
      children: [
        {
          path: 'metadata',
          name: 'Metadata',
          component: Metadata
        },
        {
          path: 'rule',
          name: 'Rule',
          component: Rule
        },
        {
          path: 'chain',
          name: 'Chain',
          component: Chain
        },
        {
          path: 'attribute',
          name: 'Attribute',
          component: Attribute
        },
        {
          path: 'infoRef',
          name: 'InfoRef',
          component: InfoRef
        },
        {
          path: 'attrRef',
          name: 'AttrRef',
          component: AttrRef
        },
        {
          path: 'information',
          name: 'Information',
          component: Information
        }
      ]
    },
    {
      path: '/integration/',
      name: 'Integration',
      component: Integration,
      children: [
        {
          path: 'process',
          name: 'Process',
          component: Process
        },
        {
          path: 'bind',
          name: 'Bind',
          component: Bind
        },
        {
          path: 'diagram',
          name: 'Diagram',
          component: Diagram
        },
        {
          path: 'realtime',
          name: 'Realtime',
          component: Realtime
        },
        {
          path: 'influx',
          name: 'Influx',
          component: Influx
        }
      ]
    }
  ]
})

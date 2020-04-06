// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import MutationObserver from '@sheerun/mutationobserver-shim'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// the MutationObserver shim is added because CRA does not yet support Jest v25.
// open issue: https://github.com/facebook/create-react-app/pull/8362
window.MutationObserver = MutationObserver

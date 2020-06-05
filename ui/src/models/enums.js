// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

// Abstract class
class Enum {
  static valueOf(stringValue) {
    for (const entry of this.entries()) {
      if (entry.value === stringValue) {
        return entry
      }
    }

    throw new Error(`Invalid enum value "${stringValue}"`)
  }

  // Return all instances of this enum
  static entries() {
    return [...this.registeredEntries]
  }

  constructor(value, label) {
    this.value = value
    this.label = label

    // Access the static property registeredEntries on the subclass being created
    if (!this.constructor.registeredEntries) {
      this.constructor.registeredEntries = []
    }

    this.constructor.registeredEntries.push(this)
  }
}

export class APIType extends Enum {
  static UNKNOWN = new APIType('unknown', 'Onbekend')
  static REST_JSON = new APIType('rest_json', 'REST/JSON')
  static REST_XML = new APIType('rest_xml', 'REST/XML')
  static SOAP_XML = new APIType('soap_xml', 'SOAP/XML')
  static GRPC = new APIType('grpc', 'gRPC')
  static GRAPHQL = new APIType('graphql', 'GraphQL')
  static SPARQL = new APIType('sparql', 'SPARQL')
  static WFS = new APIType('wfs', 'WFS')
  static WMS = new APIType('wms', 'WMS')

  toString() {
    return `APIType(${this.value})`
  }
}

export class APIAuthentication extends Enum {
  static UNKNOWN = new APIAuthentication('unknown', 'Onbekend')
  static NONE = new APIAuthentication('none', 'Geen')
  static MUTUAL_TLS = new APIAuthentication('mutual_tls', 'Mutual TLS')
  static API_KEY = new APIAuthentication('api_key', 'API Key')
  static IP_WHITELIST = new APIAuthentication('ip_whitelist', 'IP Whitelist')

  toString() {
    return `APIAuthentication(${this.value})`
  }
}

export class EnvironmentType extends Enum {
  static PRODUCTION = new EnvironmentType('production', 'Productie')
  static ACCEPTANCE = new EnvironmentType('acceptance', 'Acceptatie')
  static DEMO = new EnvironmentType('demo', 'Demo')

  toString() {
    return `EnvironmentType(${this.value})`
  }
}

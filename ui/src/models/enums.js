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

  // Abstract method
  // Return all instances of this enum
  static entries() {
    throw new Error('Please implement this method in your base class')
  }

  constructor(value, label) {
    this.value = value
    this.label = label
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

  static entries() {
    return [
      this.UNKNOWN,
      this.REST_JSON,
      this.REST_XML,
      this.SOAP_XML,
      this.GRPC,
      this.GRAPHQL,
      this.SPARQL,
      this.WFS,
      this.WMS,
    ]
  }

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

  static entries() {
    return [
      this.UNKNOWN,
      this.NONE,
      this.MUTUAL_TLS,
      this.API_KEY,
      this.IP_WHITELIST,
    ]
  }

  toString() {
    return `APIAuthentication(${this.value})`
  }
}

export class EnvironmentType extends Enum {
  static PRODUCTION = new EnvironmentType('production', 'Productie')
  static ACCEPTANCE = new EnvironmentType('acceptance', 'Acceptatie')
  static DEMO = new EnvironmentType('demo', 'Demo')

  static entries() {
    return [this.PRODUCTION, this.ACCEPTANCE, this.DEMO]
  }

  toString() {
    return `EnvironmentType(${this.value})`
  }
}

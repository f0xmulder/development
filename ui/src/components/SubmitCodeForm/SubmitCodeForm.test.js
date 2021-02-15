// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'jest-fetch-mock'
import {
  renderWithProviders,
  act,
  screen,
  waitFor,
  fireEvent,
} from '../../test-helpers'
import CodeRepository from '../../domain/code-repository'
import SubmitCodeForm from './SubmitCodeForm'

// Enable fetch mocks
fetchMock.enableMocks()

const renderForm = async (assertion) => {
  let result
  act(() => {
    result = renderWithProviders(<SubmitCodeForm />)
  })
  const projectUrlInput = screen.getByRole('textbox', { name: /Project URL/ })
  const usedApisInput = screen.getByText(/Selecteer één of meerdere API's/)
  const submitButton = screen.getByRole('button', { name: /Project toevoegen/ })

  await assertion({ result, projectUrlInput, usedApisInput, submitButton })

  // Completely complete rendering
  await act(() => Promise.resolve())
}

const json = JSON.stringify({
  page: 1,
  rowsPerPage: 9007199254740991,
  totalResults: 51,
  results: [
    {
      id: 'cbs-odata',
      description:
        'Met behulp van de CBS OData API kan je Articles, Pages, Figures, Events en Flash data van de CBS website ophalen.',
      organization_name: 'Centraal Bureau voor de Statistiek (CBS)',
      service_name: 'CBS OData',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://www.cbs.nl/odata/v1/',
          specification_url: '',
          documentation_url:
            'https://www.cbs.nl/nl-nl/onze-diensten/open-data/website-open-data',
        },
      ],
      contact: {
        email: '',
        phone: '',
        url: 'https://www.cbs.nl/nl-nl/over-ons/contact',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'eindhoven-avg-contracten',
      description:
        'Het ontsluiten van zaken / contractgegevens via het MijnApp concept.',
      organization_name: 'Eindhoven',
      service_name: 'Contracten API',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://testen.solviteers.nl/MijnApp/api',
          specification_url:
            'https://raw.githubusercontent.com/solviteers/mijnapp-api/master/contracten-api.yaml',
          documentation_url:
            'https://solviteers.github.io/mijnapp-api-contracts-docs-redoc/',
        },
      ],
      contact: {
        email: 'helpdesk@solviteers.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: null,
        pay_per_use: null,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-afval',
      description: 'Afvalcontainers en putten in Amsterdam',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Afvalcontainers en putten',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/afval/',
          specification_url:
            'https://api.data.amsterdam.nl/afval/redoc/?format=openapi',
          documentation_url: 'https://api.data.amsterdam.nl/afval/',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/afvalcontainers/issues',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-afvalophaalgebieden',
      description:
        'Vind de afval ophaaldagen voor de opgegeven locatie (x/y of lat/lon) in Amsterdam.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Afvalregels bij locatie x, y',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/afvalophaalgebieden/search/',
          specification_url:
            'https://api.data.amsterdam.nl/afvalophaalgebieden/openapi.yaml',
          documentation_url: 'https://github.com/amsterdam/afvalophaalgebieden',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/amsterdam/afvalophaalgebieden/issues',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-bag',
      description:
        'De Basisregistratie Adressen en Gebouwen (BAG) bevat gegevens over panden, verblijfsobjecten, standplaatsen en ligplaatsen en de bijbehorende adressen en de benoeming van woonplaatsen en openbare ruimten.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Basisregistratie Adressen en Gebouwen (BAG)',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/bag/v1.1/',
          specification_url:
            'https://api.data.amsterdam.nl/bag/v1.1/docs/api-docs/bag/?format=openapi',
          documentation_url: 'https://www.amsterdam.nl/stelselpedia/bag-index/',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-bag-search',
      description: 'Zoekservice voor BAG, BRK en Amsterdamse Gebieden',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'BAG Search',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/atlas/search/',
          specification_url:
            'https://api.data.amsterdam.nl/bag/docs/api-docs/search/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/search%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/atlas',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-bbga',
      description: 'Specifieke functionaliteit voor de BBGA API.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Basisbestand Gebieden Amsterdam (BBGA)',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/bbga/',
          specification_url:
            'https://api.data.amsterdam.nl/bbga/docs/api-docs/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/bbga/docs/api-docs/%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://data.amsterdam.nl/',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-brk',
      description:
        'De Basisregistratie kadaster (BRK) bevat informatie over percelen, eigendom, hypotheken, beperkte rechten (zoals recht van erfpacht, opstal en vruchtgebruik) en leidingnetwerken. Daarnaast staan er kadastrale kaarten in met perceel, perceelnummer, oppervlakte, kadastrale grens en de grenzen van het rijk, de provincies en gemeenten.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Basisregistratie Kadaster (BRK)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/brk/',
          specification_url:
            'https://api.data.amsterdam.nl/bag/docs/api-docs/brk/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/brk%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/bag_services',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-dcatd',
      description: '-',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Datasetcatalogus',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/dcatd/',
          specification_url: 'https://api.data.amsterdam.nl/dcatd/openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/dcatd/openapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/bag_services',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-gebieden',
      description:
        'In de Registratie gebieden worden de Amsterdamse stadsdelen, wijk (voorheen) buurtcombinaties, buurten en bouwblokken vastgelegd. Verder bevat de registratie gegevens van de grootstedelijke gebieden binnen de gemeente, de UNESCO werelderfgoedgrens en de gebieden van gebiedsgericht werken.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Basisregistratie Amsterdamse Gebieden',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/gebieden/',
          specification_url:
            'https://api.data.amsterdam.nl/bag/docs/api-docs/gebieden/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/gebieden%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/bag_services',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-geosearch',
      description:
        'Een API om objecten uit verschillende andere datasets van de Gemeente Amsterdam mee op te zoeken op basis van een coördinaat en een straal',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Geosearch',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/geosearch/',
          specification_url:
            'https://api.data.amsterdam.nl/geosearch/docs/geosearch.yml',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/geosearch/docs/geosearch.yml',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/geosearch',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-meetbouten',
      description:
        'In Amsterdam is een systeem gerealiseerd voor het monitoren van deformatie (zakkingen). De oudere, vooroorlogse panden in Amsterdam zijn gebouwd op houten palen. De kwaliteit van deze fundering op houten palen verschilt sterk. Een slechte fundering kan zakkingen tot gevolg hebben, waardoor de kwaliteit van deze panden afneemt en mogelijkerwijs zelfs uiteindelijk tot sloop kan leiden. Om dergelijke zakkingen te kunnen volgen zijn op grote schaal meetbouten geplaatst in de binnenstad, de 19e eeuwse gordel en de gordel 20-40, grofweg alle gebieden binnen de ringweg. Met de meetgegevens wordt vooral het inzicht vergroot in grootte en snelheid van de zakking. Eigenaren van de panden kunnen met deze inzichten rekening houden bij mogelijke investeringen. De Registratie meetbouten is een initiatief van de afdeling Wonen (opdrachtgever), de bestuurscommissies en de afdeling Basisinformatie.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Registratie Meetbouten',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/meetbouten/',
          specification_url:
            'https://api.data.amsterdam.nl/meetbouten/docs/api-docs/meetbouten?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/meetbouten/docs/api-docs/meetbouten%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/nap_meetbouten',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-milieuthemas',
      description:
        'Informatie over milieu gerelateerde zaken. Momenteel via deze api enkel explosieven in de stad. Inslagen (met mogelijke blindgangers), gevrijwaarde, verdachte en ondezochte gebieden.',
      organization_name: 'Gemeente Amsterdam',
      service_name: "Milieuthema's",
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/milieuthemas/',
          specification_url:
            'https://api.data.amsterdam.nl/milieuthemas/docs/api-docs/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/milieuthemas/docs/api-docs/%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/milieuthemas',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-monumenten',
      description:
        'De monumenten in de stad worden hier als een lijst getoond. monumenten, situeringen, complexen. Datamodel conform stelselpedia https://www.amsterdam.nl/stelselpedia/monumenten-index/catalogus-monumenten/',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Monumenten',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/monumenten',
          specification_url:
            'https://api.data.amsterdam.nl/monumenten/docs/api-docs/monumenten/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/monumenten/docs/api-docs/monumenten/%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/monumenten',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-nap-peilmerken',
      description:
        'Het Normaal Amsterdams Peil (meestal afgekort tot NAP) is de referentiehoogte waaraan hoogtemetingen in Nederland worden gerelateerd. Het NAP-net bestaat uit ongeveer 50.000 zichtbare peilmerken en 250 ondergrondse peilmerken in Nederland, waarvan ongeveer 1000 in Amsterdam.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'NAP Peilmerken',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/nap/',
          specification_url:
            'https://api.data.amsterdam.nl/meetbouten/docs/api-docs/nap?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/meetbouten/docs/api-docs/nap%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/nap_meetbouten',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-panoramabeelden',
      description:
        "De panoramas van de stad worden in een lijst getoond, panorama's, thumbnails, recente panorama's",
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Panoramabeelden',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/panorama/',
          specification_url:
            'https://api.data.amsterdam.nl/panorama/docs/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/panorama/docs/%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/panorama',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-parkeervakken',
      description:
        'De parkeervakken in de stad worden hier als een lijst getoond.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Parkeervakken',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url:
            'https://api.data.amsterdam.nl/v1/parkeervakken/parkeervakken/',
          specification_url: 'https://api.data.amsterdam.nl/v1/',
          documentation_url: 'https://api.data.amsterdam.nl/parkeervakken/',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-rioolnetwerk',
      description: '-',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Rioolnetwerk',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/dcatd/',
          specification_url: 'https://api.data.amsterdam.nl/v1/',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/v1/#/rioolnetwerk',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-signalen',
      description:
        'Deze API is onderdeel van de Signalen Informatievoorziening Amsterdam (SIA) applicatie. Burgers en andere geïnteresseerde partijen kunnen SIA gebruiken om de gemeente Amsterdam te informeren over problemen in de publieke ruimte (bijvoorbeeld geluidsoverlast, kapotte lantaarnpalen, etc.) Deze signalen worden opgepakt door de verantwoordelijke gemeentelijke diensten.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Signalen',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/signals/',
          specification_url:
            'https://api.data.amsterdam.nl/signals/swagger/openapi.yaml',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/signals/swagger/openapi.yaml',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/signals',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-tellus',
      description: '-',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Tellus',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/tellus/',
          specification_url:
            'https://api.data.amsterdam.nl/tellus/swagger.yaml',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/tellus/swagger.yaml',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/bag_services',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-typeahead',
      description: 'Typeahead API voor de datapunt Amsterdam datasets',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Typeahead',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/typeahead/',
          specification_url: 'https://api.data.amsterdam.nl/typeahead/openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/typeahead/openapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/typeahead',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-typeahead-bag-brk',
      description: 'Typeahead API over de bag, brk, en gebieden datasets',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Typeahead Bag/Brk',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/atlas/typeahead/',
          specification_url:
            'https://api.data.amsterdam.nl/bag/docs/api-docs/typeahead?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/bag/docs/api-docs/typeahead%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/atlas',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeente-amsterdam-zwaailicht',
      description:
        'Ondersteunende notificaties voor de Berichtendienst. De zwaailicht service is een REST API die op basis van de BAG+ en de WKPB pand-informatie verzamelt.',
      organization_name: 'Gemeente Amsterdam',
      service_name: 'Zwaailicht',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.data.amsterdam.nl/zwaailicht/',
          specification_url:
            'https://api.data.amsterdam.nl/zwaailicht/docs/api-docs/?format=openapi',
          documentation_url:
            'https://api.data.amsterdam.nl/api/swagger/?url=/zwaailicht/docs/api-docs/%3Fformat%3Dopenapi',
        },
      ],
      contact: {
        email: 'datapunt@amsterdam.nl',
        phone: '',
        url: 'https://github.com/Amsterdam/zwaailicht',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'gemeentelijke-regelingen-drechtsteden-kernregistratie-medewerkers',
      description: 'API voor het opvragen van medewerkergegevens.',
      organization_name: 'Gemeenschappelijke Regeling Drechtsteden',
      service_name: 'Kernregistratie Medewerkers',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://cdvtest.drechtsteden.nl/Services/KRMDW/',
          specification_url:
            'https://raw.githubusercontent.com/Drechtsteden/API/master/YAML/%5BYAML%5D%20OpvragenMDW.yml',
          documentation_url:
            'https://github.com/Drechtsteden/API/blob/master/SPECS/%5BSPEC%5D%20Opvragen%20MDW.docx',
        },
      ],
      contact: {
        email: 'd.de.wit@drechtsteden.nl',
        phone: '06-39863120',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: true,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: 1,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'kadaster-bag',
      description:
        "De Basisregistratie Adressen en Gebouwen (BAG) is onderdeel van het overheidsstelsel van basisregistraties. Gemeenten zijn bronhouders van de BAG. Zij zijn verantwoordelijk voor het opnemen van de gegevens in de BAG en voor de kwaliteit ervan. Alle gemeenten stellen gegevens over adressen en gebouwen centraal beschikbaar via de Landelijke Voorziening BAG (LV BAG). Het Kadaster beheert de LV BAG en stelt de gegevens beschikbaar aan de diverse afnemers. Organisaties met een publieke taak, zoals ministeries, waterschappen, politiekorpsen en veiligheidsregio's zijn verplicht de authentieke gegevens uit de registraties te gebruiken.",
      organization_name: 'Kadaster',
      service_name: 'Basisregistratie Adressen en Gebouwen (BAG)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://bag.basisregistraties.overheid.nl/api/v1/',
          specification_url: 'https://bag.basisregistraties.overheid.nl/api/v1',
          documentation_url: 'https://bag.basisregistraties.overheid.nl',
        },
      ],
      forum: {
        vendor: 'discourse',
        url: 'https://geoforum.nl/c/datasets/bag',
      },
      contact: {
        email: '',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: null,
        pay_per_use: null,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: false,
        provides_sla: false,
      },
    },
    {
      id: 'kadaster-brk',
      description:
        'Het Kadaster is houder van de Basisregistratie Kadaster (BRK). Onderdeel van de BRK is de Digitale kadastrale kaart. Deze is beschikbaar als open data en nu via dit portaal ook als Linked Open Data (vooralsnog zonder de topografie).',
      organization_name: 'Kadaster',
      service_name: 'Basisregistratie Kadaster (BRK)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://brk.basisregistraties.overheid.nl/api/v1',
          specification_url: 'https://brk.basisregistraties.overheid.nl/api/v1',
          documentation_url: 'https://brk.basisregistraties.overheid.nl/api/v1',
        },
      ],
      forum: {
        vendor: 'discourse',
        url: 'https://geoforum.nl/c/datasets/brk',
      },
      contact: {
        email: '',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: null,
        pay_per_use: null,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: false,
        provides_sla: false,
      },
    },
    {
      id: 'kadaster-brt',
      description:
        'Het Kadaster is houder van de Basisregistratie Topografie (BRT). De BRT bestaat uit digitale topografische bestanden op verschillende schaalniveaus. Deze verzameling topografische bestanden is via dit portaal beschikbaar als open data. Hier vindt u TOP10NL als Linked Data en via een API, en de kennisbank van de gebruikte begrippen inclusief verwijzing naar de relevante wetsartikelen. Deze site is op 27 juni 2016 door het Kadaster gelanceerd als bètaversie. Op dit moment is de kaartview functionaliteit beperkt en zijn alleen de gebouwen aanklikbaar. Verdere functionaliteit van de viewer is in ontwikkeling. Het Kadaster wil ervaring op doen om Linked Data als standaard dienstverlening aan te bieden.',
      organization_name: 'Kadaster',
      service_name: 'Basisregistratie Topografie (BRT)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://brt.basisregistraties.overheid.nl/api/v2',
          specification_url: 'https://brt.basisregistraties.overheid.nl/api/v2',
          documentation_url: 'https://brt.basisregistraties.overheid.nl',
        },
      ],
      forum: {
        vendor: 'discourse',
        url: 'https://geoforum.nl/c/datasets/brt',
      },
      contact: {
        email: '',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: null,
        pay_per_use: null,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: false,
        provides_sla: false,
      },
    },
    {
      id: 'kadaster-terugmeldingen',
      description:
        'De Terugmelding API bevat recente terugmeldingen op informatie uit de Basisregistratie Adressen en Gebouwen (BAG), Basisregistratie Grootschalige Topografie (BGT) en Basisregistratie Topografie (BRT) waarover twijfel bestaat. De API toont de locaties, inhoud en status van de meldingen. De informatie in de services wordt continu bijgewerkt. Ook is het mogelijk om via de API een terugmelding te doen. De API is beveiligd met een API-key.',
      organization_name: 'Kadaster',
      service_name: 'Terugmelding',
      api_type: 'rest_json',
      api_authentication: 'api_key',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.kadaster.nl/tms/v1/terugmeldingen',
          specification_url:
            'https://api.kadaster.nl/tms/v1/terugmeldingen-apidoc',
          documentation_url:
            'https://www.pdok.nl/restful-api/-/article/terugmeldingen-1',
        },
      ],
      contact: {
        email: 'terugmeldingapi@kadaster.nl',
        phone: '088-1834600',
        url: 'https://zakelijk.kadaster.nl/klantenservice-verbeter-de-kaart',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '95.000000',
        support_response_time: 1,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'koop-data-overheid-nl-metadata',
      description:
        'Voor data.overheid.nl is een API beschikbaar die de metadata van alle aanwezige datasets beschikbaar stelt. Alle informatie op data.overheid.nl is her te gebruiken onder de CC-0 licentie.',
      organization_name: 'KOOP',
      service_name: 'data.overheid.nl',
      api_type: 'unknown',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://data.overheid.nl/data/api/3/',
          specification_url: '',
          documentation_url: 'https://docs.ckan.org/en/latest/api/index.html',
        },
      ],
      contact: {
        email: 'opendata@overheid.nl',
        phone: '+31 70 7000 526',
        url: 'https://data.overheid.nl/ondersteuning/algemeen/contact',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'kvk-ondernemersplein',
      description:
        'Ondernemersplein biedt ondernemers volledige en up-to-date informatie van de overheid. Aangevuld met wet- en regelgeving, subsidies en evenementen. Gemaakt door een gezamenlijke overheidsredactie. Deze content wordt uitgeserveerd via een open API.',
      organization_name: 'Ondernemersplein (KVK)',
      service_name: 'Ondernemersplein API',
      api_type: 'rest_json',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://opendata.ondernemersplein.nl/api/v1',
          specification_url:
            'https://opendata.ondernemersplein.nl/swagger/v1/swagger.json',
          documentation_url: 'https://opendata.ondernemersplein.nl/docs/',
        },
      ],
      contact: {
        email: 'redactie@ondernemersplein.nl',
        phone: '',
        url: 'https://ondernemersplein.kvk.nl/ondernemersplein-api/',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'kvk-search',
      description:
        'Zoek naar een bedrijf, vind relevante data in het Handelsregister',
      organization_name: 'Kamers van Koophandel',
      service_name: 'KvK Search',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.kvk.nl:443',
          specification_url: '',
          documentation_url:
            'https://developers.kvk.nl/documentation/search-v2',
        },
      ],
      contact: {
        email: '',
        phone: '',
        url: 'https://developers.kvk.nl',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: true,
        uptime_guarantee: '90.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'logius-cor',
      description:
        'Met de COR API kunnen de OIN’s van geregistreerde organisaties worden opgevraagd en de organisatienamen bij bestaande OIN’s worden opgezocht.',
      organization_name: 'Logius',
      service_name: 'Centrale OIN Raadpleegvoorziening (COR)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://portaal.digikoppeling.nl/registers/api/v1/',
          specification_url:
            'https://portaal.digikoppeling.nl/registers/api/v1/',
          documentation_url:
            'https://portaal.digikoppeling.nl/registers/corApi/index',
        },
      ],
      contact: {
        email: 'servicecentrum@logius.nl',
        phone: '0900-5554555',
        url: 'https://www.logius.nl/contact',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: true,
        pay_per_use: false,
        uptime_guarantee: '98.000000',
        support_response_time: 3,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'logius-cpa-register',
      description:
        'Met de API van het CPA register kunnen alle CPA gerelateerde beheerwerkzaamheden geautomatiseerd worden uitgevoerd.',
      organization_name: 'Logius',
      service_name: 'CPA-register',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://cparegister.nl',
          specification_url: 'https://cparegister.nl/api/v1',
          documentation_url: 'https://cparegister.nl/developer/docs/',
        },
      ],
      contact: {
        email: 'servicecentrum@logius.nl',
        phone: '0900 555 45 55',
        url: 'https://www.logius.nl/contact',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: true,
        pay_per_use: false,
        uptime_guarantee: '98.000000',
        support_response_time: 3,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'luchtmeetnet-luchtmeetnet',
      description:
        'This API grants direct access to detailed information of the stations and the measurements of  air quality on several measuring stations in the Netherlands and the calculated air quality maps',
      organization_name: 'Luchtmeetnet',
      service_name: 'Luchtmeetnet',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://api.luchtmeetnet.nl/open_api/',
          specification_url: '',
          documentation_url: 'https://api-docs.luchtmeetnet.nl',
        },
      ],
      contact: {
        email: '',
        phone: '',
        url: 'https://www.luchtmeetnet.nl/contact',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'minbzk-bronhouderportaal',
      description:
        'Met deze API is het mogelijk om volledig geautomatiseerd brondocumenten aan te leveren aan het Bronhouderportaal BRO. De API is RESTful opgezet. In vogelvlucht werkt de API door eerst een Upload aan te maken waar vervolgens, door middel van het sturen van een POST request met als body de XML van het brondocument, meerdere Brondocumenten aan kunnen worden toegevoegd. Van de Upload kan een Levering gemaakt worden. Vervolgens kan de status van de levering periodiek worden opgevraagd, waarbij uiteindelijk een BRO-ID teruggeven wordt. Ter ondersteuning van de kwaliteitscontrole van een levering is het mogelijk om een levering en/of de brondocumenten van een levering te verrijken met extra gegevens. Daarnaast kunnen brondocumenten gevalideerd worden, zonder dat hiervoor een levering wordt aangemaakt. Deze functionaliteit is tevens geschikt om te testen of de koppeling met de API correct functioneert.',
      organization_name:
        'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)',
      service_name: 'Bronhouderportaal BRO API (1.0.0)',
      api_type: 'rest_xml',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://demo.bronhouderportaal-bro.nl/api',
          specification_url:
            'https://www.bronhouderportaal-bro.nl/doc/openapi.yaml',
          documentation_url:
            'https://www.bronhouderportaal-bro.nl/doc/api.html',
        },
      ],
      contact: {
        email: '',
        phone: '0031888664999',
        url: 'https://basisregistratieondergrond.nl/servicepagina/',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.900000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'minbzk-omgevingsdocumenten-opvragen',
      description:
        'Met deze API worden alle omgevingsdocumenten ontsloten die door overheden beschikbaar zijn gesteld aan de Landelijke Voorziening Bekendmaken en Beschikbaar stellen (LVBB). Het betreft alle gegevens waar het omgevingsdocument uit is opgebouwd. De gegevens worden objectgericht ontsloten op basis van de API strategie van het digitaal stelsel Omgevingswet.',
      organization_name:
        'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)',
      service_name: 'Omgevingsdocumenten Opvragen',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url:
            'https://service.pre.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/opvragen/v2',
          specification_url:
            'https://pre.omgevingswet.overheid.nl/knooppunt/apistore/api-docs/Kadaster/Omgevingsdocumenten-Opvragen/v2',
          documentation_url:
            'https://aandeslagmetdeomgevingswet.nl/publish/pages/155982/20181121_functionele_documentatie_ozon_api_omgevingsdocumenten_opvragen.pdf',
        },
      ],
      contact: {
        email: '',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: null,
        pay_per_use: null,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: false,
        provides_sla: false,
      },
    },
    {
      id: 'minienw-parkeerdatacatalogus',
      description:
        'Statische en real-time dynamische parkeerdata van publiek toegankelijke on street (straatparkeren) en off street (garages en terreinen) parkeerfaciliteiten (van publieke (gemeentelijke) en private exploitanten',
      organization_name: 'Ministerie van Infrastructuur en Waterstaat',
      service_name: 'parkeerdatacatalogus',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'http://www.parkeerdatacatalogus.nl',
          specification_url: '',
          documentation_url: 'https://openparking.nl',
        },
      ],
      contact: {
        email: 'ron.peerenboom@rapptrans.nl',
        phone: '0621235207',
        url: 'https://openparking.nl',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: 2,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'provincie-zuid-holland-subsidieregister',
      description: 'Subsidieregister van de provincie Zuid-Holland',
      organization_name: 'Provincie Zuid-Holland',
      service_name: 'Subsidieregister',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://subsidieregister.zuid-holland.nl/api/',
          specification_url:
            'https://subsidieregister.zuid-holland.nl/api/?format=openapi',
          documentation_url: 'https://subsidieregister.zuid-holland.nl/api/',
        },
      ],
      contact: {
        email: 'zuidholland@pzh.nl',
        phone: '0031704416622',
        url: 'https://www.zuid-holland.nl',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'rdw-brv',
      description: 'Alle niet-gevoelige gegevens van het wagenpark.',
      organization_name: 'RDW',
      service_name: 'Gekentekende voertuigen',
      api_type: 'unknown',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://opendata.rdw.nl',
          specification_url: '',
          documentation_url:
            'https://dev.socrata.com/foundry/opendata.rdw.nl/m9d7-ebf2',
        },
      ],
      contact: {
        email: '',
        phone: '',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: null,
        pay_per_use: null,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: false,
        provides_sla: false,
      },
    },
    {
      id: 'rijksmuseum-rijksmuseum',
      description:
        "De live website-API (die een live link naar het websiteplatform heeft) maakt de mogelijkheden van de bekroonde website van het Rijksmuseum direct toegankelijk voor ontwikkelaars. Het doorzoeken van de collectie via de API biedt een breed scala aan interessante mogelijkheden, zoals de functie 'explore the collection', de collecties van de Rijksstudio-gebruikers en de 'tiled images die worden gebruikt om in te zoomen op close-ups van kunstwerken. Andere soorten gegevens zijn ook beschikbaar, zoals informatie uit de evenementenkalender van het Rijksmuseum. De op JSON gebaseerde service is zo eenvoudig te gebruiken dat u in een mum van tijd een toepassing kunt maken met de rijke en vrij toegankelijke inhoud van het Rijksmuseum.",
      organization_name: 'Rijksmuseum',
      service_name: 'Rijksmuseum API',
      api_type: 'unknown',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://www.rijksmuseum.nl/en/api',
          specification_url: '',
          documentation_url: 'https://rijksmuseum.github.io',
        },
      ],
      contact: {
        email: 'website@rijksmuseum.nl',
        phone: '',
        url: 'https://www.rijksmuseum.nl/en/research/contact-form',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '0.000000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'rivm-aerius-connect',
      description:
        'AERIUS stelt een API (Application Programming Interface) beschikbaar aan ontwikkelaars, waarmee zij via een computer interface (API) opdrachten kunnen uitvoeren op de AERIUS Calculator, zonder gebruik te maken van een gebruikersomgeving (GUI). Voor de AERIUS Connect API betreft het opdrachten voor het valideren, converteren en rekenen met AERIUS Calculator.',
      organization_name: 'RIVM',
      service_name: 'AERIUS Connect',
      api_type: 'rest_json',
      api_authentication: 'api_key',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://connect.aerius.nl/api',
          specification_url: 'https://connect.aerius.nl/api/5/swagger.yaml',
          documentation_url: 'https://connect.aerius.nl/api/doc/',
        },
      ],
      contact: {
        email: 'pasbureau@bij12.nl',
        phone: '085 – 486 25 90',
        url:
          'https://www.bij12.nl/onderwerpen/stikstof-en-natura2000/helpdesk/',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'rvo-dbs',
      description:
        'Met de Digitale Bereikbaarheidsservice (DBS) kunnen Marktpartijen die postafhandelingsdiensten verzorgen voor overheidsorganisaties de digitale bereikbaarheid van ondernemingen vaststellen. Het is een nieuwe dienst om grote aantallen digitale berichten te verzenden naar ondernemers.',
      organization_name: 'RVO Rijksdienst voor Ondernemend Nederland',
      service_name: 'Digitale BereikbaarheidsService (DBS)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://developer.berichtenvoorbedrijven.nl',
          specification_url:
            'https://developer.berichtenvoorbedrijven.nl/api-docs/carbon.super/DBS/0.1',
          documentation_url:
            'https://developer.berichtenvoorbedrijven.nl/apis/info?name=DBS&version=0.1',
        },
      ],
      contact: {
        email: 'contact@e-overheidvoorbedrijven.nl',
        phone: '088-0424230',
        url:
          'https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/dienstverlening-aan-burgers-en-ondernemers/berichtenbox-voor-bedrijven/',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-ac',
      description: 'De referentieimplementatie van het autorisatiecomponent.',
      organization_name: 'VNG Realisatie',
      service_name: 'Autorisatiecomponent (AC)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://autorisaties-api.vng.cloud/api/v1/',
          specification_url:
            'https://autorisaties-api.vng.cloud/api/v1/schema/openapi.json',
          documentation_url:
            'https://github.com/VNG-Realisatie/gemma-autorisatiecomponent',
        },
      ],
      contact: {
        email: 'standaarden.ondersteuning@vng.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-bevraging-ingeschreven-persoon',
      description:
        'API voor het opvragen van persoonsgegevens van een ingeschreven persoon, Voor de getoonde API URL is een APIkey vereist.',
      organization_name: 'VNG Realisatie',
      service_name: 'Bevraging Ingeschreven Persoon',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://www.haalcentraal.nl/haalcentraal/api/brp',
          specification_url:
            'https://raw.githubusercontent.com/VNG-Realisatie/Haal-Centraal-BRP-bevragen/master/specificatie/openapi.yaml',
          documentation_url:
            'https://github.com/VNG-Realisatie/Haal-Centraal-BRP-bevragen',
        },
      ],
      contact: {
        email: '',
        phone: '',
        url: 'https://github.com/VNG-Realisatie/Haal-Centraal-BRP-bevragen',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: true,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-brc',
      description:
        'De referentieimplementatie van het besluitregistratiecomponent.',
      organization_name: 'VNG Realisatie',
      service_name: 'Besluitregistratiecomponent (BRC)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://besluiten-api.vng.cloud/api/v1/',
          specification_url:
            'https://besluiten-api.vng.cloud/api/v1/schema/openapi.json',
          documentation_url:
            'https://github.com/VNG-Realisatie/gemma-besluitregistratiecomponent',
        },
      ],
      contact: {
        email: 'standaarden.ondersteuning@vng.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-cdf-energie-maps',
      description:
        "Dit is een 'convenience' API. We hebben energie gerelateerde data van netbeheerders, kadaster en de BAG tot een dataset samengevoegd waarmee energie gerelateerde kaarten gemaakt kunnen worden.\n\nAlle relevante open energie data in een keer bij de hand.\n\nDeze dataset is  de basis voor tvw.commondatafactory.nl.\n\nPer pand zijn er ~25 attributen over hoogte, oppervlakte, volume, gasverbruik over meerdere jaren, elektra verbruik over meerdere jaren, bouwjaar, postcode.\n\nWe zijn zorgvuldig geweest maar er zullen zeker nog 'rare' dingen in de data zitten. Ook omdat meetgegevens fouten bevatten of omdat panden samen worden genomen voor de anonimiteit (in het geval van de meetgegevens).",
      organization_name: 'VNG / commondatafactory',
      service_name: 'Energie data Nederland per pand',
      api_type: 'wfs',
      api_authentication: 'none',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://maps.commondatafactory.nl/maps/energy',
          specification_url: '',
          documentation_url: 'https://commondatafactory.nl/docs/API',
        },
        {
          name: 'acceptance',
          api_url: 'https://acc.maps.commondatafactory.nl/maps/energy',
          specification_url: '',
          documentation_url: 'https://commondatafactory.nl/docs/API',
        },
      ],
      contact: {
        email: 'stephan@Preeker.net',
        phone: '0624692297',
        url: 'https://commondatafactory.nl/contact',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '80.000000',
        support_response_time: 5,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'vng-drc',
      description:
        'De referentieimplementatie van het documentregistratiecomponent.',
      organization_name: 'VNG Realisatie',
      service_name: 'Documentregistratiecomponent (DRC)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://documenten-api.vng.cloud/api/v1/',
          specification_url:
            'https://documenten-api.vng.cloud/api/v1/schema/openapi.json',
          documentation_url: 'https://documenten-api.vng.cloud/',
        },
      ],
      contact: {
        email: 'standaarden.ondersteuning@vng.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-nrc',
      description: 'De referentieimplementatie van het notificatiecomponent.',
      organization_name: 'VNG Realisatie',
      service_name: 'Notificatierouteringscomponent (NRC)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://notificaties-api.vng.cloud/api/v1/',
          specification_url:
            'https://notificaties-api.vng.cloud/api/v1/schema/openapi.json',
          documentation_url: 'https://notificaties-api.vng.cloud/',
        },
      ],
      contact: {
        email: 'standaarden.ondersteuning@vng.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-open-raadsinformatie',
      description:
        'Raadsinformatie van gemeenten. Onder andere notulen, moties, agenda’s en raadsbesluiten. Beschikbaar voor hergebruik via deze API.',
      organization_name: 'VNG Realisatie',
      service_name: 'Open Raadsinformatie',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'http://api.openraadsinformatie.nl/v0',
          specification_url: '',
          documentation_url:
            'https://docs.openraadsinformatie.nl/user/api.html#general-notes',
        },
      ],
      contact: {
        email: 'paul.suijkerbuijk@vng.nl',
        phone: '+31620490628',
        url: '',
      },
      is_reference_implementation: false,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: '99.500000',
        support_response_time: 2,
      },
      scores: {
        has_documentation: true,
        has_specification: false,
        has_contact_details: true,
        provides_sla: true,
      },
    },
    {
      id: 'vng-zrc',
      description:
        'De referentieimplementatie van het zaakregistratiecomponent.',
      organization_name: 'VNG Realisatie',
      service_name: 'Zaakregistratiecomponent (ZRC)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://zaken-api.vng.cloud/api/v1/',
          specification_url:
            'https://zaken-api.vng.cloud/api/v1/schema/openapi.json',
          documentation_url: 'https://zaken-api.vng.cloud/',
        },
      ],
      contact: {
        email: 'standaarden.ondersteuning@vng.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
    {
      id: 'vng-ztc',
      description: 'De referentieimplementatie van de zaaktypecatalogus.',
      organization_name: 'VNG Realisatie',
      service_name: 'Zaaktypecatalogus (ZTC)',
      api_type: 'rest_json',
      api_authentication: 'unknown',
      badges: [],
      environments: [
        {
          name: 'production',
          api_url: 'https://catalogi-api.vng.cloud/api/v1/',
          specification_url:
            'https://catalogi-api.vng.cloud/api/v1/schema/openapi.json',
          documentation_url: 'https://catalogi-api.vng.cloud/',
        },
      ],
      contact: {
        email: 'standaarden.ondersteuning@vng.nl',
        phone: '',
        url: '',
      },
      is_reference_implementation: true,
      referenced_apis: [],
      terms_of_use: {
        government_only: false,
        pay_per_use: false,
        uptime_guarantee: null,
        support_response_time: null,
      },
      scores: {
        has_documentation: true,
        has_specification: true,
        has_contact_details: true,
        provides_sla: false,
      },
    },
  ],
  facets: {
    organization_name: {
      terms: [
        {
          term: 'Centraal Bureau voor de Statistiek (CBS)',
          count: 1,
        },
        {
          term: 'Eindhoven',
          count: 1,
        },
        {
          term: 'Gemeenschappelijke Regeling Drechtsteden',
          count: 1,
        },
        {
          term: 'Gemeente Amsterdam',
          count: 21,
        },
        {
          term: 'KOOP',
          count: 1,
        },
        {
          term: 'Kadaster',
          count: 4,
        },
        {
          term: 'Kamers van Koophandel',
          count: 1,
        },
        {
          term: 'Logius',
          count: 2,
        },
        {
          term: 'Luchtmeetnet',
          count: 1,
        },
        {
          term:
            'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)',
          count: 2,
        },
        {
          term: 'Ministerie van Infrastructuur en Waterstaat',
          count: 1,
        },
        {
          term: 'Ondernemersplein (KVK)',
          count: 1,
        },
        {
          term: 'Provincie Zuid-Holland',
          count: 1,
        },
        {
          term: 'RDW',
          count: 1,
        },
        {
          term: 'RIVM',
          count: 1,
        },
        {
          term: 'RVO Rijksdienst voor Ondernemend Nederland',
          count: 1,
        },
        {
          term: 'Rijksmuseum',
          count: 1,
        },
        {
          term: 'VNG / commondatafactory',
          count: 1,
        },
        {
          term: 'VNG Realisatie',
          count: 8,
        },
      ],
    },
    api_type: {
      terms: [
        {
          term: 'rest_json',
          count: 46,
        },
        {
          term: 'rest_xml',
          count: 1,
        },
        {
          term: 'unknown',
          count: 3,
        },
        {
          term: 'wfs',
          count: 1,
        },
      ],
    },
  },
})

describe('SubmitCodeForm', () => {
  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(json)
  })

  it('should exist', () => {
    const wrapper = shallow(<SubmitCodeForm />)
    expect(wrapper.exists()).toEqual(true)
  })

  describe('on intialize', () => {
    beforeEach(() => {
      fetch.resetMocks()
      fetch.mockResponseOnce(json)
    })

    it('should fetch all the APIs', async () => {
      renderForm(() => {
        expect(fetch).toHaveBeenCalledWith(
          `/api/apis?rowsPerPage=${Number.MAX_SAFE_INTEGER}`,
        )
      })
    })
  })

  describe('Form', () => {
    beforeEach(() => {
      fetch.resetMocks()
      fetch.mockResponseOnce(json)
    })

    it('should have an alert about new project requirements', async () => {
      renderForm(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
    })

    it('should have a button to create an issue on GitLab', async () => {
      renderForm(() => {
        expect(
          screen.getByRole('link', { name: /Melding maken op GitLab/ }),
        ).toBeInTheDocument()
      })
    })

    it('should have a project URL input field', async () => {
      renderForm(({ projectUrlInput }) => {
        expect(projectUrlInput).toBeInTheDocument()
      })
    })

    it("should have a used API's select field", async () => {
      renderForm(({ usedApisInput }) => {
        expect(usedApisInput).toBeInTheDocument()
      })
    })

    it('should have a submit button', async () => {
      renderForm(({ submitButton }) => {
        expect(submitButton).toBeInTheDocument()
      })
    })

    describe('Errors', () => {
      beforeEach(async () => {
        fetch.resetMocks()
      })

      it('shows an error when the API is down', () => {
        fetch.mockReject(() => Promise.reject(new Error('API is down')))

        renderForm(() => {
          waitFor(() => {
            expect(
              screen.getByText(
                /Er ging iets fout tijdens het ophalen van de beschikbare API's/,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('Validations', () => {
      beforeEach(async () => {
        fetch.resetMocks()
        fetch.mockResponse(json)
      })

      it('show an error when the project url is missing', async () => {
        await renderForm(async ({ projectUrlInput, submitButton }) => {
          act(() => {
            fireEvent.change(projectUrlInput, {
              target: { value: '' },
            })
          })
          fireEvent.click(submitButton)

          await waitFor(() => {
            // Formik returns partially untranslated errors
            expect(
              screen.getByText(/URL naar code is a required field/),
            ).toBeInTheDocument()
          })
        })
      })

      it('show an error when the project url is invalid', async () => {
        await renderForm(async ({ projectUrlInput, submitButton }) => {
          act(() => {
            fireEvent.change(projectUrlInput, {
              target: { value: '24/05/2020' },
            })
          })
          fireEvent.click(submitButton)

          await waitFor(() => {
            // Jest returns untranslated errors
            expect(
              screen.getByText(/URL naar code must be a valid URL/),
            ).toBeInTheDocument()
          })
        })
      })

      it('show an error when the project url is not GitHub/GitLab', async () => {
        await renderForm(async ({ projectUrlInput, submitButton }) => {
          act(() => {
            fireEvent.change(projectUrlInput, {
              target: { value: 'http://www.test.com' },
            })
          })
          fireEvent.click(submitButton)

          await waitFor(() => {
            // Formik returns partially untranslated errors
            expect(
              screen.getByText(
                /URL naar code moet een GitLab of GitHub repository zijn/,
              ),
            ).toBeInTheDocument()
          })
        })
      })

      it('shows an error when used API is missing', async () => {
        await renderForm(async ({ submitButton }) => {
          fireEvent.click(submitButton)
          await waitFor(() => {
            expect(
              screen.getByText(/Selecteer ten minste één gebruikte API/),
            ).toBeInTheDocument()
          })
        })
      })

      // Logic needs to be extracted one level higher in order to test this
      it.skip('should submit with valid data', async () => {
        fetch.mockResponse(json)
        // fetch.mockResponseOnce(JSON.stringify({ ok: true }))

        CodeRepository.create = jest.fn()

        await renderForm(
          async ({ projectUrlInput, usedApisInput, submitButton }) => {
            act(() => {
              fireEvent.change(projectUrlInput, {
                target: { value: 'https://www.gitlab.com/don/test-repo' },
              })
            })
            act(() => {
              fireEvent.click(projectUrlInput)
            })
            act(() => {
              fireEvent.keyDown(usedApisInput, { keyCode: 13 })
            })

            fireEvent.click(submitButton)
            console.log(screen.debug())
            expect(CodeRepository.create).toHaveBeenCalledWith('')
          },
        )
      })
    })
  })
})

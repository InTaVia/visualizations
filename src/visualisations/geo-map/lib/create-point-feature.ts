import type { EntityEvent, Place } from '@intavia/api-client'
import { assert } from '@stefanprobst/assert'
import type { Feature, Point } from 'geojson'

import { isValidPoint } from '@/visualisations/geo-map/lib/is-valid-point'

interface CreatePointFeatureParams {
  place: Place
  event: EntityEvent
}

export function createPointFeature(
  params: CreatePointFeatureParams,
): Feature<Point, { event: EntityEvent; place: Place }> {
  const { place, event } = params

  assert(place.geometry)
  assert(isValidPoint(place.geometry))

  const point: Feature<Point, { event: EntityEvent; place: Place }> = {
    id: event.id,
    type: 'Feature',
    geometry: place.geometry,
    properties: {
      event,
      place,
    },
  }

  return point
}

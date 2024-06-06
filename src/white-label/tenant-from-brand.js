const tenantFromBrand = (brand) => {
  switch (brand) {
    case 'cudo':
    case 'cudotravel':
    case 'treatme':
    case 'treatmetravel':
    case 'deals':
    case 'dealstravel':
    case 'lebusinesstraveller':
      return 'lux'
    case 'scoopontravel':
    case 'scooponexperience':
    case 'scoopon':
      return 'scoopon'
    case 'ledvendor':
    case 'led_admin':
      return 'led_admin'
    case 'yidu':
      return 'yidu'
    case 'zoomzoom':
      return 'zoomzoom'
    case 'kogantravel':
      return 'kogantravel'
    case 'leagenthub':
      return 'leagenthub'
    default:
      return 'lux'
  }
}

module.exports = tenantFromBrand

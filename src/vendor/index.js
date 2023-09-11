const LE_TOURS_VENDOR_IDS = [
  '00128000018BZkIAAW',
  '0010I00001ba7JdQAI',
  '0010I00001f6bHvQAI',
  '0010I000028DrsxQAC',
  '0012y00000LHHZoAAP',
]

// riverside cruise vendor
const LE_CRUISES_VENDOR_IDS = ['0012y00000fiCfEAAU']

function requiresTravellerDetails(vendorId) {
  // include cruises created as tours as well in the check
  return LE_TOURS_VENDOR_IDS.includes(vendorId) || LE_CRUISES_VENDOR_IDS.includes(vendorId)
}

module.exports = {
  requiresTravellerDetails: requiresTravellerDetails,
}

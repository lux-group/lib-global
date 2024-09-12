const LE_TOURS_VENDOR_IDS = [
  '00128000018BZkIAAW',
  '0010I00001ba7JdQAI',
  '0010I00001f6bHvQAI',
  '0010I000028DrsxQAC',
  '0012y00000LHHZoAAP',
]

function requiresTravellerDetails(vendorId) {
  return LE_TOURS_VENDOR_IDS.includes(vendorId)
}

// vendors served by svc-tour
const FLASH_CRUISE_VENDORS = [
  '0010I000027LvRJQA0',  // Norwegian Cruise Line
  '0012y00000fiCfEAAU',  // Riverside
  '0010I000021BD5dQAG',  // Quark Expeditions
  '0012800000cvFemAAE',  // Coral Expeditions
  '0012y00000BKJ04AAH',  // Uniworld
]

function isFlashCruiseVendor(vendorId) {
  return FLASH_CRUISE_VENDORS.includes(vendorId)
}

module.exports = {
  requiresTravellerDetails: requiresTravellerDetails,
  isFlashCruiseVendor: isFlashCruiseVendor,
}

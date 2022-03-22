"use strict";

var LE_TOURS_VENDOR_IDS = ['00128000018BZkIAAW', '0010I00001ba7JdQAI', '0010I00001f6bHvQAI', '0010I000028DrsxQAC', '0012y00000LHHZoAAP'];

function requiresTravellerDetails(vendorId) {
  return LE_TOURS_VENDOR_IDS.includes(vendorId);
}

module.exports = {
  requiresTravellerDetails: requiresTravellerDetails
};
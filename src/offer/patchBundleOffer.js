const { OFFER_TYPE_BUNDLE_AND_SAVE, STATUS_CONTENT_APPROVED, STATUS_HIDDEN } = require('./constants')

// when it comes it is  bundle offer it should operate attached packages as its own, so put them into .packages field
function patchBundleOffer(offer) {
  if (offer.type !== OFFER_TYPE_BUNDLE_AND_SAVE) {
    throw new Error(`Not ${OFFER_TYPE_BUNDLE_AND_SAVE} offer provided`)
  }

  const allAttachedPackages = offer.packages
    .filter(
      (pack) =>
        pack.status === STATUS_CONTENT_APPROVED || pack.status === STATUS_HIDDEN,
    )
    .map((pack) => {
      const options = pack.attached_package_options.map((option) => {
        const [
          offer_id,
          le_package_id,
          fk_room_type_id,
          fk_room_rate_id,
        ] = option.split('|')
        return {
          offer_id,
          le_package_id,
          fk_room_type_id,
          fk_room_rate_id,
        }
      })

      return {
        ...pack,
        attached_package_options: undefined,
        options,
      }
    })

  const allAttachedPackageOptions = allAttachedPackages.flatMap((pack) => {
    return pack.options
  })

  // map option name and rate id to package if package became bundle via option
  const attachedPackages = offer.attached_packages.map((pack) => {
    pack.max_extra_nights = pack.bundle_max_extra_nights || pack.max_extra_nights
    pack.prices = (pack.bundle_prices || []).length > 0 ? pack.bundle_prices :  pack.prices

    if (!pack.package_options.length) {
      return pack
    }

    let bundledOption
    for (let i = 0; i < allAttachedPackageOptions.length; i++) {
      bundledOption = pack.package_options.find(
        (option) =>
          option.fk_room_rate_id ===
          allAttachedPackageOptions[i].fk_room_rate_id,
      )
      if (bundledOption) {
        break
      }
    }
    if (bundledOption) {
      pack.fk_room_rate_id = bundledOption.fk_room_rate_id
      pack.name = bundledOption.name
      pack.package_options = []
    }

    return pack
  })

  offer.bundle_packages = allAttachedPackages
  offer.bundled_offers = offer.offer_bundles
  offer.packages = attachedPackages
  delete offer.attached_packages
}

module.exports = patchBundleOffer

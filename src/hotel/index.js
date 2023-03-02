import { startCase } from 'lodash'

const buildNotificationPayload = (
  notificationText,
  details,
) => {
  const fields = []

  Object.entries(details).forEach(
    ([key, value]) => fields.push(
      {
        type: 'mrkdwn',
        text: `*${startCase(key)}*: ${value}`,
      },
    ))

  const fieldObject = {
    type: 'section',
    fields: fields,
  }

  const payload = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${details.channelManager} Alert!`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${notificationText}`,
        },
      },
      fieldObject,
    ],
  }

  return payload
}

module.exports = {
  buildNotificationPayload,
}

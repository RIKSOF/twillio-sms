'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited.
 *
 * @file Module for working with Twilio SMS service.
 */
const Twilio = require( 'twilio' );
const BAD_REQUEST = 400;

/**
 * Helper class for working with Twilio to send an SMS.
 *
 * @class [SMS Object]
 *
 */
class SMS {

  /**
   * Constructor creating twilio client object.
   *
   * @constructor
   *
   * @param {string} accountSid                       The account's secret identifier.
   * @param {string} authToken                        The authentication token.
   *
   * @class [SMS Object]
   */
  constructor( accountSid, authToken ) {
    this.twilioClient = new Twilio( accountSid, authToken );
  }

  /**
   * Sends an SMS to the given identifier.
   *
   * @param {Object} data                               Data to be send.
   *
   * @returns {Promise} p
   */
  send( data ) {
    // Initialize error as empty.
    let error = null;

    // Validate the param from constains value.
    if ( !data.from ) error = new Error('Please provide sender phone number');

    // Validate the param to constains value.
    if ( !data.to ) error = new Error('Please provide recipient phone numbers');

    // Validate the param message constains value.
    if ( !data.message ) error = new Error('Please provide message for an SMS');

    // Throw Validation error if exist.
    if ( error ) {
      error.status = BAD_REQUEST;
      return Promise.reject( error );
    }

    return this.twilioClient.messages.create({
      to: data.to,
      from: data.from,
      body: data.message
    });
  }
}

// Make the module available to all
module.exports = SMS;

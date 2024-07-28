// Author: Igor Dimitrijević (@igorskyflyer)

export interface IOptions {
  /**
   * A Boolean that indicates whether replacing should be case-sensitive or not.
   *
   * Default is `true`.
   */
  caseSensitive?: boolean
  /**
   * A Boolean that indicates whether strict mode is enabled.
   *
   * In strict mode, only whole matches are replaced.
   *
   * Default is `false`.
   */
  strict?: boolean
}

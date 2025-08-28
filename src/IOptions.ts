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
  /**
   * When `true`, overlapping search patterns are matched in order of
   * longest pattern length first, rather than the order they were added.
   *
   * This prevents shorter patterns from "stealing" matches that should
   * belong to longer, more specific patterns.
   *
   * @default true
   *
   * Use `false` only if you need strict insertion-order precedence.
   */
  longestMatchFirst?: boolean
}

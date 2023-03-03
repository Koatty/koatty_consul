/*
 * @Description:
 * @Usage:
 * @Author: xxx
 * @Date: 2020-12-24 10:32:14
 * @LastEditTime: 2022-03-15 10:40:55
 */
import { Koatty, Logger, Helper } from "koatty";

/**
 *
 *
 * @interface OptionsInterface
 */
interface OptionsInterface {
  // todo

}

/**
 * default options
 */
const defaultOptions: OptionsInterface = {
  // todo

};

export function KoattyConsul(options: OptionsInterface, app: Koatty): Promise<any> {
  // todo
  const opt = { ...defaultOptions, ...options };

  return Promise.resolve();
}
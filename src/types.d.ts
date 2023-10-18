import type { Dispatch, SetStateAction } from 'react'

export interface BaseData<Data> {
  success: boolean
  data: Data
  error: string
}

export interface CurrenciesConfig {
  currencies_config: Currency[]
}

export interface Currency {
  name: string
  code: string
  fullname: string
  network: string
  validation_name: string
  name_displayed_in_exp_reward: string
  protocol: string
  img: string
  min: number
  to_small: number
  precision: number
  precision_to_balance: number
  disabled_withdraw: boolean
  disabled_deposits: boolean
  withdraw_for_premium_users: boolean
  is_currency_need_exchange: boolean
  disabled_balance: boolean
  is_at_referral_program: boolean
  used_to_buy_rlt: boolean
  balance_key: string
  is_wrapped: boolean
  wrapped_multiplier: number
  color: string
  divider: number
  is_can_be_mined: boolean
  is_user_fee_enabled: boolean
  position: number
  user_wallet_key: string
  check_url: string
  base_currency: string
  tag: string
}

export interface DateAndValue {
  date: string
  value: number
}

export type PowerUnits = 'Th' | 'Ph' | 'Eh' | 'Zh'

export type StateFunction<State> = Dispatch<SetStateAction<State>>

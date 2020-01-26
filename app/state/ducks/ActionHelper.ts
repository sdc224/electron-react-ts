/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';

interface IMeta {
  method: string;
  route: string;
}

/**
 * @desc Action with only Meta
 */
interface IMetaAction<TType extends TypeConstant, TMeta> {
  type: TType;
  meta?: TMeta;
}

export type MetaAction = IMetaAction<TypeConstant, IMeta>;

export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

/**
 * @copyright Copyright (c) 2018 Martin Hochel
 * Borrowed from the rex-tils library
 */

type ActionsCreatorsMapObject = {
  [actionCreator: string]: (...args: any[]) => any;
};

export type ActionsUnion<A extends ActionsCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export type ActionsOfType<
  ActionUnion,
  ActionType extends string
> = ActionUnion extends Action<ActionType> ? ActionUnion : never;

export type StringMap<T> = { [key: string]: T };

export type Nested<T> = {
  [k in keyof T]: T[k] extends { type: infer NT }
    ? NT extends () => void
      ? ReturnType<NT>
      : NT extends Record<string, any>
      ? Nested<NT>
      : never
    : never;
};

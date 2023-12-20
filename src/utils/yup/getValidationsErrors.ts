export async function getValidationsErrors(values: any, schema: any) {
  try {
    await schema.validate(values, {
      abortEarly: false
    })

    return true
  } catch (err: any) {
    let errors: any = {}

    err.inner
      ? err.inner.forEach((error: any) => {
          errors = { ...errors, [error.path]: error.message }
        })
      : []

    return errors
  }
}

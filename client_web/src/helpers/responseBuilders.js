export function successfulResponse (message, data, snackbarVariant = 'success') {
  return { isSuccessful: true, message: message, data: data, snackbarVariant: snackbarVariant }
}

export function unsuccessfulResponse (message, snackbarVariant = 'error') {
  return { isSuccessful: false, message: message, snackbarVariant: snackbarVariant }
}

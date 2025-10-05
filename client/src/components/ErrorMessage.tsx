type propsType = {
    errorMessage: string | null,
    setErrorMessage: (errorMessage: string | null) => void
}

export function ErrorMessage({errorMessage, setErrorMessage}: propsType) {
    return (
        <>
            {errorMessage &&
                <div
                    className="alert alert-danger position-absolute top-50 start-50 translate-middle z-2"
                    role="alert"
                >
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="alert-heading me-4">Ошибка!</h4>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setErrorMessage(null)}
                        />
                    </div>
                    <hr/>
                    <p>{errorMessage}</p>
                </div>}
        </>
    );
}

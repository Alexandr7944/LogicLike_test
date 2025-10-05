import './loader-style.css';

type LoaderProps = {
    title?: string,
    showLoader: boolean
};

const Loader: React.FC<LoaderProps> = ({title, showLoader}) => {
    return (
        <>
            {
                showLoader &&
                <div className="loader-container">
                    <h3>
                        {title ?? 'Идет загрузка...'}
                    </h3>
                    <div className="ldsSpinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
        </>
    )
};

export default Loader;

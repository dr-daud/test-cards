import img from './error.gif';

const ErrorMessage = () => {
    return (
        <>
            <img style={{ display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto", marginTop: "200px" }} src={img} alt='Error' />
            <p style={{ fontSize: "30px", textAlign: "center", marginTop: "20px", color: "#5c79ba" }}>Не удалось получить карточки</p>
        </>
    )
}

export default ErrorMessage;
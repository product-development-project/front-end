import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import { Button } from './UI/Button';

export default function Homev3() {
    const navigate = useNavigate();
    return (
        <>
            <TopBar 
                title='Home'
                backButtonDisabled={true}
            >

                <Button
                    value="Job Tasks"
                    name="jobTasks-button"
                    onClick={() => navigate('/jobTasksUpload')}
                    style={{
                        marginTop: '15px'
                    }}
                />

                <Button
                    value="Job Advertisements"
                    name="jobTasks-button"
                    onClick={() => navigate('/jobTasksUpload')}
                    style={{
                        marginTop: '15px'
                    }}
                />

            </TopBar>

            <Footer/>
        </>
    )
}
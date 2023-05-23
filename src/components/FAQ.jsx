import React from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function FAQ() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What is the purpose of workIT?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            workIT provides users (programmers) with the opportunity to solve programming tasks of various complexity and topics, fight with other participants and improve their programming skills. workIT also allows employers to test the skills of potential employees by organizing competions for job vacancies.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What are the advantages of this system for programmers?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This system allows programmers to develop their IT knowledge, improve speed, logical thinking and correctness.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What are the advantages of this system for companies?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Companies can use this system as a means to discover talented programmers and identify potential employees. Participants who have good programming skills and can cope well with tasks can be potential candidates for jobs in the company.
            Companies can organize competitions for jobs, submit tasks or use system tasks that will be checked automatically. The company will be able to review the code and the effectiveness of the code.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>How does the system evaluate the achievements of the participants in the competition?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The achievements of the participants in the competition are evaluated according to the speed, correctness and efficiency of their decisions. The faster and more correctly the participant solves the task, the more points he gets. Points can be used on a leaderboard where participants rank, leading to prizes or recognition.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Does the system provide an opportunity to find a job?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The main purpose of this system is to provide programmers with an opportunity to improve their skills and develop programming abilities, as well as for companies to test the knowledge of potential employees. However, the system does not guarantee an immediate job.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
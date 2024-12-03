import * as React from 'react';
import { styled } from '@mui/joy';
import { 
  Accordion, 
  AccordionGroup, 
  AccordionSummary, 
  AccordionDetails, 
  Avatar, 
  ListItemContent,
  Stack 
} from '@mui/joy';
import { accordionSummaryClasses, accordionDetailsClasses } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

const Topics = styled(AccordionGroup)(({ theme }) => ({
  borderRadius: theme.radius.md,
  overflow: 'hidden',
  [`& .${accordionSummaryClasses.button}`]: {
    minHeight: 64,
  },
  [`& .${accordionSummaryClasses.indicator}`]: {
    transition: '0.2s',
  },
  [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
    transform: 'rotate(45deg)',
  },
  [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]: {
    paddingBlock: '1rem',
  },
}));

interface TopicProps {
  title?: string;
  icon?: string | React.ReactNode;
  startCollapsed?: boolean;
  children?: React.ReactNode;
}

function Topic({ title, icon, startCollapsed, children }: TopicProps) {
  const [expanded, setExpanded] = React.useState(startCollapsed !== true);
  const hideTitleBar = !title && !icon;

  return (
    <Accordion
      expanded={expanded || hideTitleBar}
      onChange={(_event, expanded) => setExpanded(expanded)}
      sx={{
        '&:not(:last-child)': {
          borderBottomColor: 'primary.softActiveBg',
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      {!hideTitleBar && (
        <AccordionSummary
          color='primary'
          variant={expanded ? 'plain' : 'soft'}
          indicator={<AddIcon />}
        >
          {!!icon && (
            <Avatar
              color='primary'
              variant={expanded ? 'soft' : 'plain'}
            >
              {icon}
            </Avatar>
          )}
          <ListItemContent>
            {title}
          </ListItemContent>
        </AccordionSummary>
      )}
      <AccordionDetails>
        <Stack sx={{ gap: 'calc(var(--Card-padding) / 2)', border: 'none' }}>
          {children}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export { Topics, Topic };
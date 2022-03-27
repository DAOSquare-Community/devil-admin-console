import { useState, useEffect } from 'react'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import Calendar from 'color-calendar'
import 'color-calendar/dist/css/theme-glass.css'

function CalendarComponent({ isLargerThan1280, eventsData }) {
  const [isOpen, setIsOpen] = useState(false)
  const [curEvents, setCurEvents] = useState([])

  useEffect(() => {
    let padding = isLargerThan1280 ? 110 : 30

    new Calendar({
      id: '#calendar',
      primaryColor: '#FF98D3',
      theme: 'glass',
      border: `${padding}px solid #fff`,
      weekdayType: 'long-upper',
      monthDisplayType: 'long',
      headerBackgroundColor: '#fff',
      headerColor: '#323232',

      eventsData,
      selectedDateClicked: (currentDate, events) => {
        // console.log('selected date clicked', currentDate, events);
        if (events.length > 0) {
          setCurEvents(events)
          setIsOpen(true)
        }
      },
      dateChanged: (currentDate, events) => {
        // console.log('date change', currentDate, events);
        if (events.length > 0) {
          setCurEvents(events)
          setIsOpen(true)
        }
      },
      monthChanged: (currentDate, events) => {
        // console.log('month change', currentDate, events);
      },
    })
  }, [isLargerThan1280, eventsData])

  return (
    <>
      <Box id="calendar" />
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Events</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Box mb={8}>
              {curEvents.length > 0 &&
                curEvents.map((d, i) => (
                  <Box key={i}>
                    <Box mb={2} color="#5B93FF">
                      {d.name}
                    </Box>
                    <Box mb={5} fontSize="14px">
                      <Box>
                        <Box display="inline-block" w="44px">
                          Start:
                        </Box>
                        {new Date(d.start).toLocaleString('en-US', {
                          dateStyle: 'full',
                          timeStyle: 'medium',
                        })}
                      </Box>
                      <Box>
                        <Box display="inline-block" w="44px">
                          End:
                        </Box>
                        {new Date(d.end).toLocaleString('en-US', {
                          dateStyle: 'full',
                          timeStyle: 'medium',
                        })}
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CalendarComponent

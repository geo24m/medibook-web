import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalFooter, FormGroup, Label, Form, InputGroup, Input} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Settingmenu from '../Subpages/Settingmenu';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import 'fullcalendar/dist/fullcalendar.min.css';

const DefaultEvents = [
    {
        title: 'All Day Event',
        start: new Date().setDate(new Date().getDate() + 1),
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: new Date().setDate(new Date().getDate() - 5),
        allDay: false,
        className: 'bg-teal'
    },
    {
        id: 999,
        title: 'Meeting',
        start: new Date().setDate(new Date().getDate() - 3),
        allDay: false,
        className: 'bg-purple'
    },
    {
        id: 999,
        title: 'Meeting',
        start: new Date().setDate(new Date().getDate() + 4),
        allDay: false,
        className: 'bg-warning'
    },
    {
        title: 'Meeting',
        start: new Date().setDate(new Date().getDate() + 4),
        allDay: false,
        className: 'bg-danger'
    },
];

class Agenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hour: null, start_date: null, start_hour: null, end_hour: null, end_date: null, date: new Date(),
            createAgendaModal: false,
            calendarWeekends: true,
            calendarEvents: DefaultEvents,
        }
        this.calendarComponentRef = React.createRef();

        // DatePicker
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);

        // TimePicker
        this.handleTimeStart = this.handleTimeStart.bind(this);
        this.handleTimeEnd = this.handleTimeEnd.bind(this);
        this.handleHour = this.handleHour.bind(this);

        this.handleDateClick = this.handleDateClick.bind(this);

        this.tog_createAgendaModal = this.tog_createAgendaModal.bind(this);
    }

    tog_createAgendaModal() {
        this.setState(prevState => ({
            createAgendaModal: !prevState.createAgendaModal
        }));
        this.removeBodyCss();
    }

    removeBodyCss() {
        document.body.classList.add('no_padding');
    }

    componentDidMount() {
        this.props.activateAuthLayout();
    }

    //DatePicker
    handleStart(date) {
        this.setState({ start_date: date });
    }
    handleEnd(date) {
        this.setState({ end_date: date });
    }

    //TimePicker
    handleTimeStart(time) {
        this.setState({ start_hour: time})
    }
    handleTimeEnd(time) {
        this.setState({ end_hour: time})
    }
    handleHour(time) {
        this.setState({ hour: time})
    }

    handleDateClick = (arg) => {
        var title = prompt('Event Title:');
        this.setState({ selectedDay: arg });
        if (title == null) { }
        else {
            var newEvent = {};
            newEvent = {
                id: this.state.calendarEvents.length + 1,
                title: title,
                start: this.state.selectedDay ? this.state.selectedDay.date : new Date(),
                className: 'bg-primary'
            };
            this.setState({
                calendarEvents: this.state.calendarEvents.concat(newEvent),
                selectedDay: null
            });

        }


    }

    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">Mon agenda</h4>
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="#">Medibook</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Mon agenda</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    <Settingmenu />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col md="12">
                            <Card className="email-leftbar">
                                <Button type="button" className="btn btn-success font-size-16" onClick={this.tog_createAgendaModal}><i className="mdi mdi-plus-circle-outline mr-1"></i>Créer un agenda</Button>
                            
                            </Card>
                            <Modal isOpen={this.state.createAgendaModal} toggle={this.tog_createAgendaModal} >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0" id="myModalLabel">Creation de l'agenda</h5>
                                    <button type="button" onClick={() => this.setState({ createAgendaModal: false })} className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <ModalBody>
                                    <Form action="#">
                                        <FormGroup className="mb-2 forminput">
                                            <Label>Definir une periode</Label>
                                            <Row>
                                                <Col md="6">
                                                    <DatePicker
                                                        selected={this.state.start_date}
                                                        selectsStart
                                                        className="form-control"
                                                        minDate={new Date()}
                                                        startDate={this.state.start_date}
                                                        endDate={this.state.end_date}
                                                        onChange={this.handleStart}
                                                        placeholderText="Date de debut"
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <DatePicker
                                                        selected={this.state.end_date}
                                                        selectsEnd
                                                        className="form-control"
                                                        minDate={this.state.start_date}
                                                        startDate={this.state.start_date}
                                                        endDate={this.state.end_date}
                                                        onChange={this.handleEnd}
                                                        placeholderText="Date de fin"
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                        <FormGroup className="mb-0">
                                            <Label>Jours de travaille</Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Lundi
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Mardi
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Mercredi
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Jeudi
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Vendredi
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Samedi
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline className="mb-2 forminput">
                                            <Label check> Dimanche
                                            <Input type="checkbox" className="form-control" /> 
                                            </Label>
                                        </FormGroup>
                                        <FormGroup className="mb-2 forminput">
                                            <Label>Horaire des consulations</Label>
                                            <Row>
                                                <Col md="6">
                                                    <DatePicker
                                                        selected={this.state.start_hour}
                                                        className="form-control"
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={5}
                                                        timeCaption="Time"
                                                        timeFormat="HH:mm"
                                                        dateFormat="H:mm"
                                                        onChange={this.handleTimeStart}
                                                        placeholderText="Heure de début"
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <DatePicker
                                                        selected={this.state.end_hour}
                                                        className="form-control"
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={5}
                                                        timeCaption="Time"
                                                        timeFormat="HH:mm"
                                                        dateFormat="H:mm"
                                                        onChange={this.handleTimeEnd}
                                                        placeholderText="Heure de fin"
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                        <FormGroup className="forminput">
                                            <Label>Durée de la consultation</Label>
                                            <DatePicker
                                                selected={this.state.hour}
                                                className="form-control"
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeInputLabel="Minute:"
                                                timeIntervals={5}
                                                timeFormat="mm"
                                                dateFormat="mm"
                                                onChange={this.handleHour}
                                                placeholderText="Durée de la consultation"
                                            />
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="button" color="secondary" onClick={this.tog_createAgendaModal} className="waves-effect">Fermer</Button>
                                    <Button type="button" color="primary" className="waves-effect waves-light">Enregistrer</Button>
                                </ModalFooter>
                            </Modal>
                            <Card className="email-rightbar">
                                <CardBody>
                                    <FullCalendar ref={this.calendarComponentRef} defaultView="dayGridMonth" plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                                        slotDuration={'00:15:00'}
                                        minTime={'08:00:00'}
                                        maxTime={'19:00:00'}
                                        handleWindowResize={true}
                                        themeSystem="bootstrap"
                                        header={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,dayGridWeek,dayGridDay'
                                        }}
                                        dateClick={this.handleDateClick}
                                        editable={true}
                                        droppable={true}
                                        eventLimit={true}
                                        selectable={true}
                                        events={this.state.calendarEvents}
                                        id="calendar" />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>

            </React.Fragment >
        )
    }
}

// export default Calendar;

export default withRouter(connect(null, { activateAuthLayout })(Agenda));
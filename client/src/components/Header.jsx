import React,{Component} from 'react'
import {isAuthenticated} from '../utils/auth'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
         DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


export default class Header extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div>
        <Navbar className='header'
                light expand="md">
          <NavbarBrand href={'/'}>
              Korpus
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen}
                    navbar>
            {isAuthenticated() ?
            <Nav className="ml-auto"
                 navbar>
              <NavItem>
                <NavLink href="/transfer">
                    Make Transfer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">
                    Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">
                    About
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav
                                    inNavbar>
                <DropdownToggle nav
                                caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href='/balance'>
                       My Balance
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href='/transfers'>
                        My Transfers
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink href='/logout'>
                        Exit
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
                :
                <Nav className="ml-auto"
                     navbar>
                  <NavItem>
                    <NavLink href="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register">
                      Register
                    </NavLink>
                  </NavItem>
                </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
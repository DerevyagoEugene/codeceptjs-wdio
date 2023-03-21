@avia_sales
Feature: Avia Sales

  Background:
    Given I navigate to the site

  @smoke
  Scenario: Validate Avia Sales
      When I fill the info
        | departure | arrival | type     | dateFrom        | dateTo          |
        | Minsk     | Batumi  | business | Wed Mar 22 2023 | Wed Apr 26 2023 |
      Then List of flights is loaded
      And Search criteria are correct
      
      Then Print the fastes route to
      And Print the fastest route from
       
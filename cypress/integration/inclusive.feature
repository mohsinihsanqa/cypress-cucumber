Feature: Go City user journeys
I want to cover gocity user journeys

Scenario: UJ-1 : Choose all-inclusive pass and checkout
    Given I open gocity page
    When I choose all inclusive pass and checkout
    Then I see the checkout page

Scenario: UJ-2: Choose a single pass and checkout
    Given I open gocity page
    When I choose a single package and checkout 
    Then I see the checkout page
import * as actions from './index';

describe('actions', () => {
  it('should create an action to set a tournament', () => {
    const tournament = { id: 1, name: 'Awesome Tourney', qty: 4}
    const expected = {
      type: 'SET_TOURNAMENT',
      tournament
    }
    expect(actions.setTournament(tournament)).toEqual(expected)
  })

  it('should create an action to add a team', () => {
    const team = { id: 1, name: 'Awesome Team'}
    const expected = {
      type: 'NEW_TEAM',
      team
    }
    expect(actions.addTeam(team)).toEqual(expected)
  })

  it('should create an action to update teams array', () => {
    const teams = [{ id: 1, name: 'Awesome Team'}, {id: 2, name: 'gret'}]
    const expected = {
      type: 'UPDATE_TEAMS',
      teams
    }
    expect(actions.updateTeams(teams)).toEqual(expected)
  })

  it('should create an action to set current matchup', () => {
    const matchup = { id: 1, team1: 'Awesome Team', team2: 'greg'}
    const expected = {
      type: 'SET_MATCHUP',
      matchup
    }
    expect(actions.setMatchup(matchup)).toEqual(expected)
  })

  it('should create an action to load tournaments from firebase', () => {
    const tournaments = [{id: 1}, {id: 2}, {id: 3}]
    const expected = {
      type: 'LOAD_TOURNAMENTS',
      tournaments
    }
    expect(actions.loadFromFirebase(tournaments)).toEqual(expected)
  })

  it('should create an action to update scores', () => {
    const id = 2
    const expected = {
      type: 'UPDATE_SCORE',
      id
    }
    expect(actions.updateTeamScore(id)).toEqual(expected)
  })

  it('should create an action to set the first round array', ()=> {
    const matchups = [{team1: 'greg', team2: 'dude'}, {team1: 'austin', team2: 'steve'}]
    const expected = {
      type: 'SET_FIRST_ROUND',
      matchups
    }
    expect(actions.setFirstRound(matchups)).toEqual(expected)
  })

  it('should create an action to submit a winner', ()=> {
    const round = 1
    const match = {team1: 'steve', team2: 'greg', winner: 'greg'}
    const expected = {
      type: 'SUBMIT_WINNER',
      round,
      match
    }
    expect(actions.submitWinner(round, match)).toEqual(expected)
  })

  it('should create an action set rounds of the tourney', ()=> {
    const rounds = [[1,2,3,4], [1,2]]
    const expected = {
      type: 'SET_ROUNDS',
      rounds
    }
    expect(actions.createTournamentRounds(rounds)).toEqual(expected)
  })

  it('should create an action to set next round', () => {
    const round = 2
    const matchups = [{team1: 'greg', team2: 'steve'}, {team1: 'greg', team2: 'steve'}]
    const expected = {
      type: 'SET_NEXT_ROUND',
      round,
      matchups
    }
    expect(actions.updateNextRound(round, matchups)).toEqual(expected);
  })

  it('should create an action to set a champion', () => {
    const champion = {name: 'greg'}
    const expected = {
      type: 'SET_CHAMPION',
      champion
    }
    expect(actions.setChampion(champion)).toEqual(expected);
  })

})

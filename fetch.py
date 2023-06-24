import requests

LEAGUE_IDS = [179, 39, 180, 40, 135, 61, 78, 140]
SEASON = 2022
URL = "https://v3.football.api-sports.io/standings?"

def callAPI(league):

    endpoint = URL + "league=" + str(league) + "&season=" + str(SEASON)
    
    headers = {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "be7b2d3d04cf9933b43300492745c67b"
    }

    # response = requests.get(endpoint, headers=headers)
    # league = response.json()["response"][0]["league"]["standings"]
    league = [{'rank': 1, 'team': {'id': 247, 'name': 'Celtic', 'logo': 'https://media-3.api-sports.io/football/teams/247.png'}, 'points': 70, 'goalsDiff': 60, 'group': 'Premiership: 1st Phase', 'form': 'WWWWW', 'status': 'same', 'description': 'Championship Round', 'all': {'played': 25, 'win': 23, 'draw': 1, 'lose': 1, 'goals': {'for': 78, 'against': 18}}, 'home': {'played': 12, 'win': 12, 'draw': 0, 'lose': 0, 'goals': {'for': 37, 'against': 7}}, 'away': {'played': 13, 'win': 11, 'draw': 1, 'lose': 1, 'goals': {'for': 41, 'against': 11}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 2, 'team': {'id': 257, 'name': 'Rangers', 'logo': 'https://media.api-sports.io/football/teams/257.png'}, 'points': 61, 'goalsDiff': 35, 'group': 'Premiership: 1st Phase', 'form': 'WWWWW', 'status': 'same', 'description': 'Championship Round', 'all': {'played': 25, 'win': 19, 'draw': 4, 'lose': 2, 'goals': {'for': 58, 'against': 23}}, 'home': {'played': 13, 'win': 11, 'draw': 2, 'lose': 0, 'goals': {'for': 34, 'against': 8}}, 'away': {'played': 12, 'win': 8, 'draw': 2, 'lose': 2, 'goals': {'for': 24, 'against': 15}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 3, 'team': {'id': 254, 'name': 'Heart OF Midlothian', 'logo': 'https://media.api-sports.io/football/teams/254.png'}, 'points': 42, 'goalsDiff': 10, 'group': 'Premiership: 1st Phase', 'form': 'WLDWW', 'status': 'same', 'description': 'Championship Round', 'all': {'played': 25, 'win': 12, 'draw': 6, 'lose': 7, 'goals': {'for': 45, 'against': 35}}, 'home': {'played': 13, 'win': 9, 'draw': 1, 'lose': 3, 'goals': {'for': 31, 'against': 20}}, 'away': {'played': 12, 'win': 3, 'draw': 5, 'lose': 4, 'goals': {'for': 14, 'against': 15}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 4, 'team': {'id': 255, 'name': 'Livingston', 'logo': 'https://media-3.api-sports.io/football/teams/255.png'}, 'points': 35, 'goalsDiff': -7, 'group': 'Premiership: 1st Phase', 'form': 'WLDWW', 'status': 'same', 'description': 'Championship Round', 'all': {'played': 24, 'win': 10, 'draw': 5, 'lose': 9, 'goals': {'for': 27, 'against': 34}}, 'home': {'played': 12, 'win': 6, 'draw': 3, 'lose': 3, 'goals': {'for': 13, 'against': 11}}, 'away': {'played': 12, 'win': 4, 'draw': 2, 'lose': 6, 'goals': {'for': 14, 'against': 23}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 5, 'team': {'id': 249, 'name': 'Hibernian', 'logo': 'https://media-3.api-sports.io/football/teams/249.png'}, 'points': 34, 'goalsDiff': -1, 'group': 'Premiership: 1st Phase', 'form': 'WDWDW', 'status': 'up', 'description': 'Championship Round', 'all': {'played': 25, 'win': 10, 'draw': 4, 'lose': 11, 'goals': {'for': 37, 'against': 38}}, 'home': {'played': 12, 'win': 6, 'draw': 3, 'lose': 3, 'goals': {'for': 24, 'against': 14}}, 'away': {'played': 13, 'win': 4, 'draw': 1, 'lose': 8, 'goals': {'for': 13, 'against': 24}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 6, 'team': {'id': 251, 'name': 'ST Mirren', 'logo': 'https://media.api-sports.io/football/teams/251.png'}, 'points': 33, 'goalsDiff': -7, 'group': 'Premiership: 1st Phase', 'form': 'LWWLL', 'status': 'up', 'description': 'Championship Round', 'all': {'played': 24, 'win': 9, 'draw': 6, 'lose': 9, 'goals': {'for': 26, 'against': 33}}, 'home': {'played': 13, 'win': 7, 'draw': 4, 'lose': 2, 'goals': {'for': 16, 'against': 9}}, 'away': {'played': 11, 'win': 2, 'draw': 2, 'lose': 7, 'goals': {'for': 10, 'against': 24}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 7, 'team': {'id': 252, 'name': 'Aberdeen', 'logo': 'https://media.api-sports.io/football/teams/252.png'}, 'points': 32, 'goalsDiff': -8, 'group': 'Premiership: 1st Phase', 'form': 'WLLLW', 'status': 'down', 'description': 'Relegation Round', 'all': {'played': 25, 'win': 10, 'draw': 2, 'lose': 13, 'goals': {'for': 39, 'against': 47}}, 'home': {'played': 13, 'win': 8, 'draw': 1, 'lose': 4, 'goals': {'for': 30, 'against': 14}}, 'away': {'played': 12, 'win': 2, 'draw': 1, 'lose': 9, 'goals': {'for': 9, 'against': 33}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 8, 'team': {'id': 258, 'name': 'ST Johnstone', 'logo': 'https://media.api-sports.io/football/teams/258.png'}, 'points': 27, 'goalsDiff': -13, 'group': 'Premiership: 1st Phase', 'form': 'LWLLL', 'status': 'same', 'description': 'Relegation Round', 'all': {'played': 25, 'win': 8, 'draw': 3, 'lose': 14, 'goals': {'for': 29, 'against': 42}}, 'home': {'played': 12, 'win': 3, 'draw': 2, 'lose': 7, 'goals': {'for': 13, 'against': 18}}, 'away': {'played': 13, 'win': 5, 'draw': 1, 'lose': 7, 'goals': {'for': 16, 'against': 24}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 9, 'team': {'id': 250, 'name': 'Kilmarnock', 'logo': 'https://media.api-sports.io/football/teams/250.png'}, 'points': 23, 'goalsDiff': -23, 'group': 'Premiership: 1st Phase', 'form': 'LWLLL', 'status': 'up', 'description': 'Relegation Round', 'all': {'played': 25, 'win': 6, 'draw': 5, 'lose': 14, 'goals': {'for': 21, 'against': 44}}, 'home': {'played': 12, 'win': 6, 'draw': 3, 'lose': 3, 'goals': {'for': 16, 'against': 17}}, 'away': {'played': 13, 'win': 0, 'draw': 2, 'lose': 11, 'goals': {'for': 5, 'against': 27}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 10, 'team': {'id': 902, 'name': 'Ross County', 'logo': 'https://media.api-sports.io/football/teams/902.png'}, 'points': 21, 'goalsDiff': -18, 'group': 'Premiership: 1st Phase', 'form': 'LDWDL', 'status': 'up', 'description': 'Relegation Round', 'all': {'played': 25, 'win': 5, 'draw': 6, 'lose': 14, 'goals': {'for': 20, 'against': 38}}, 'home': {'played': 13, 'win': 3, 'draw': 3, 'lose': 7, 'goals': {'for': 13, 'against': 22}}, 'away': {'played': 12, 'win': 2, 'draw': 3, 'lose': 7, 'goals': {'for': 7, 'against': 16}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 11, 'team': {'id': 256, 'name': 'Motherwell', 'logo': 'https://media-3.api-sports.io/football/teams/256.png'}, 'points': 20, 'goalsDiff': -11, 'group': 'Premiership: 1st Phase', 'form': 'LLLDL', 'status': 'down', 'description': 'Relegation Round', 'all': {'played': 24, 'win': 5, 'draw': 5, 'lose': 14, 'goals': {'for': 27, 'against': 38}}, 'home': {'played': 11, 'win': 1, 'draw': 3, 'lose': 7, 'goals': {'for': 10, 'against': 19}}, 'away': {'played': 13, 'win': 4, 'draw': 2, 'lose': 7, 'goals': {'for': 17, 'against': 19}}, 'update': '2023-02-05T00:00:00+00:00'}, {'rank': 12, 'team': {'id': 1386, 'name': 'Dundee Utd', 'logo': 'https://media-3.api-sports.io/football/teams/1386.png'}, 'points': 20, 'goalsDiff': -17, 'group': 'Premiership: 1st Phase', 'form': 'LLLDL', 'status': 'down', 'description': 'Relegation Round', 'all': {'played': 24, 'win': 5, 'draw': 5, 'lose': 14, 'goals': {'for': 26, 'against': 43}}, 'home': {'played': 12, 'win': 4, 'draw': 1, 'lose': 7, 'goals': {'for': 15, 'against': 22}}, 'away': {'played': 12, 'win': 1, 'draw': 4, 'lose': 7, 'goals': {'for': 11, 'against': 21}}, 'update': '2023-02-05T00:00:00+00:00'}]

    
    ids = []
    names = []
    badges = []
    playeds =[]
    gds = []
    gfs = []
    gas = []
    forms = []
    points = []
    standings = []


    for i in range(0, len(league)): 
        
        ids.append(league[i]["team"]["id"])
        names.append(league[i]["team"]["name"])
        badges.append(league[i]["team"]["logo"])
        playeds.append(league[i]["all"]["played"])
        gds.append(league[i]["goalsDiff"])
        gfs.append(league[i]["all"]["goals"]["for"])
        gas.append(league[i]["all"]["goals"]["against"])
        forms.append(league[i]["form"])
        points.append(league[i]["points"])

        team = {
            "id": ids[i],
            "name": names[i],
            "badge": badges[i],
            "played": playeds[i],
            "gd": gds[i],
            "gf": gfs[i],
            "ga": gas[i],
            "form": forms[i],
            "points": points[i]
        }

        standings.append(team)


    if len(league) == 3:

        for l in league[1]:

            rank += 1
            ids.append(l["team"]["id"])
            rank(rank)
            names.append(l["team"]["name"])
            badges.append(l["team"]["logo"])
            playeds.append(l["all"]["played"])
            gds.append(l["goalsDiff"])
            gfs.append(l["all"]["goals"]["for"])
            gas.append(l["all"]["goals"]["against"])
            forms.append(l["form"])
            points.append(l["points"])

            team = {
                id: ids[i],
                rank: rank,
                name: names[i],
                badge: badges[i],
                played: playeds[i],
                gd: gds[i],
                gf: gfs[i],
                ga: gas[i],
                form: forms[i],
                points: points[i]
            }
            standings.append(team)


    

callAPI(179)
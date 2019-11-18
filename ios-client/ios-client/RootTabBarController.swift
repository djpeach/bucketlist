//
//  RootTabBarController.swift
//  MyHome
//
//  Created by Daniel Peach on 10/6/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class RootTabBarController: UITabBarController, UITabBarControllerDelegate {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        delegate = self
        
        let boldIcons = UIImage.SymbolConfiguration(weight: .bold)
        
        let dashboard = DashboardVC()
        dashboard.tabBarItem = UITabBarItem(title: nil, image: UIImage(systemName: "list.bullet.below.rectangle", withConfiguration: boldIcons), selectedImage: nil)
        let newSuggestion = CreateSuggestionVC()
        newSuggestion.tabBarItem = UITabBarItem(title: nil, image: UIImage(systemName: "plus.square", withConfiguration: boldIcons), selectedImage: nil)
        let profile = ProfileVC()
        profile.tabBarItem = UITabBarItem(title: nil, image: UIImage(systemName: "person", withConfiguration: boldIcons), selectedImage: nil)
        
        viewControllers = [dashboard, newSuggestion, profile]
        selectedIndex = 1
        
//        guard let items = tabBar.items else { return }
//
//        for item in items {
//            item.imageInsets = UIEdgeInsets(top: 8, left: 0, bottom: -8, right: 0)
//        }
    }
}

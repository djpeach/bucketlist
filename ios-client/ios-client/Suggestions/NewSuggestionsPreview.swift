//
//  NewSuggestionsPreview.swift
//  ios-client
//
//  Created by Peach, Daniel on 11/12/19.
//  Copyright © 2019 Peach, Daniel. All rights reserved.
//

import UIKit
import JGProgressHUD

class NewSuggestionsPreview: UITableView {
    let previewCount = 3
    
    override init(frame: CGRect, style: UITableView.Style) {
        super.init(frame: frame, style: style)
        
        delegate = self
        dataSource = self
        
        let hud = JGProgressHUD(style: .dark)
        hud.show(in: self)
        hud.backgroundColor = UIColor.systemGray.withAlphaComponent(0.6)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension NewSuggestionsPreview: UITableViewDelegate, UITableViewDataSource {
    override var numberOfSections: Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return previewCount
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        return cell
    }
}
